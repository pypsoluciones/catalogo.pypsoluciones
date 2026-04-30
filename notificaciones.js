/* ═══════════════════════════════════════════════════════════════════════════
   P&P ERP — SISTEMA GLOBAL DE NOTIFICACIONES
   ═══════════════════════════════════════════════════════════════════════════
   - Polling automático cada 30 segundos
   - Badge rojo con contador en la campana del header
   - Panel desplegable con lista de notificaciones
   - Click en notificación: marca leída + redirige a url_accion
   - Botón "Marcar todas como leídas"
   - Auto-refresh al volver a la pestaña (visibilitychange)
   - Cero soporte: errores claros, no rompe la página si la API falla
   ═══════════════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // ─── Configuración ──────────────────────────────────────────────────────
    const POLLING_MS = 30_000;        // 30 segundos
    const MAX_NOTIF_VISIBLES = 10;    // Tope en el panel
    let pollingTimer = null;
    let inicializado = false;

    // ─── Wrapper Supabase REST ──────────────────────────────────────────────
    function getToken() {
        return localStorage.getItem('pyp_token_seguro');
    }

    async function rpc(funcion, payload) {
        const token = getToken();
        if (!token) return null;

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${funcion}`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload || {})
            });
            if (!res.ok) {
                console.warn(`[notif] RPC ${funcion} falló: ${res.status}`);
                return null;
            }
            return await res.json();
        } catch (e) {
            console.warn(`[notif] RPC ${funcion} error:`, e.message);
            return null;
        }
    }

    async function fetchVista(vista) {
        const token = getToken();
        if (!token) return [];

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${vista}`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) return [];
            return await res.json();
        } catch {
            return [];
        }
    }

    // ─── Helpers UI ─────────────────────────────────────────────────────────
    function fechaRelativa(iso) {
        const d = new Date(iso);
        const seg = Math.floor((Date.now() - d.getTime()) / 1000);
        if (seg < 60)         return 'hace un momento';
        if (seg < 3600)       return `hace ${Math.floor(seg/60)} min`;
        if (seg < 86400)      return `hace ${Math.floor(seg/3600)} h`;
        if (seg < 604800)     return `hace ${Math.floor(seg/86400)} d`;
        return d.toLocaleDateString('es-VE', { day: '2-digit', month: 'short' });
    }

    function colorPrioridad(prioridad) {
        switch (prioridad) {
            case 'CRITICA': return { bg:'bg-red-50',    border:'border-red-300',    text:'text-red-700',    badge:'bg-red-600' };
            case 'ALTA':    return { bg:'bg-orange-50', border:'border-orange-300', text:'text-orange-700', badge:'bg-orange-500' };
            case 'BAJA':    return { bg:'bg-gray-50',   border:'border-gray-200',   text:'text-gray-600',   badge:'bg-gray-400' };
            default:        return { bg:'bg-blue-50',   border:'border-blue-200',   text:'text-blue-700',   badge:'bg-blue-500' };
        }
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }

    // ─── Render badge ───────────────────────────────────────────────────────
    function renderBadge(total, criticas) {
        const badge = document.getElementById('badge-notif');
        if (!badge) return;

        if (!total || total === 0) {
            badge.classList.add('hidden');
            badge.textContent = '0';
            return;
        }

        badge.classList.remove('hidden');
        badge.textContent = total > 99 ? '99+' : String(total);

        // Si hay críticas, badge pulsa
        if (criticas > 0) {
            badge.classList.add('animate-pulse');
            badge.style.backgroundColor = '#dc2626';
        } else {
            badge.classList.remove('animate-pulse');
            badge.style.backgroundColor = '';
        }
    }

    // ─── Render panel de notificaciones ─────────────────────────────────────
    function renderLista(items) {
        const cont = document.getElementById('lista-notif');
        if (!cont) return;

        if (!items || items.length === 0) {
            cont.innerHTML = `
                <div class="text-center py-8 px-4">
                    <i class="fa-solid fa-bell-slash text-3xl text-gray-300 mb-2"></i>
                    <div class="text-[11px] font-bold text-gray-500 uppercase">Sin notificaciones</div>
                    <div class="text-[10px] text-gray-400 mt-1">Las alertas aparecerán aquí</div>
                </div>`;
            return;
        }

        // Header con botón marcar todo
        let html = `
            <div class="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
                <span class="text-[10px] font-bold text-gray-500 uppercase">
                    ${items.length} pendiente${items.length>1?'s':''}
                </span>
                <button onclick="window.marcarTodasNotifLeidas()"
                        class="text-[9px] font-bold text-primary hover:text-secondary uppercase tracking-wider transition">
                    <i class="fa-solid fa-check-double mr-1"></i> Marcar todas
                </button>
            </div>`;

        // Mostrar máximo MAX_NOTIF_VISIBLES
        const visibles = items.slice(0, MAX_NOTIF_VISIBLES);

        for (const n of visibles) {
            const c = colorPrioridad(n.prioridad);
            const icono = n.icono || '🔔';
            const onclickAction = n.url_accion
                ? `window.abrirNotificacion('${n.id_notificacion}', '${escapeHtml(n.url_accion)}')`
                : `window.marcarNotifLeida('${n.id_notificacion}')`;

            html += `
                <div onclick="${onclickAction}"
                     class="cursor-pointer ${c.bg} ${c.border} border rounded-lg p-2.5 mb-1.5 hover:shadow-md transition-all">
                    <div class="flex items-start gap-2">
                        <div class="text-lg leading-none mt-0.5">${icono}</div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-start gap-2">
                                <div class="text-[11px] font-black ${c.text} truncate">
                                    ${escapeHtml(n.titulo)}
                                </div>
                                <span class="text-[8px] ${c.badge} text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">
                                    ${n.prioridad}
                                </span>
                            </div>
                            <div class="text-[10px] text-gray-700 mt-0.5 line-clamp-2">
                                ${escapeHtml(n.mensaje)}
                            </div>
                            <div class="text-[9px] text-gray-400 mt-1 flex items-center gap-1">
                                <i class="fa-regular fa-clock"></i>
                                ${fechaRelativa(n.fecha_creacion)}
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        if (items.length > MAX_NOTIF_VISIBLES) {
            html += `
                <div class="text-center py-2 text-[10px] text-gray-500 font-bold">
                    + ${items.length - MAX_NOTIF_VISIBLES} más...
                </div>`;
        }

        cont.innerHTML = html;
    }

    // ─── Carga principal ────────────────────────────────────────────────────
    async function cargarNotificaciones(silencioso = false) {
        const conteo = await rpc('contar_notificaciones_no_leidas');
        if (conteo) {
            renderBadge(conteo.total || 0, conteo.criticas || 0);
        }

        // Solo recargar lista si el panel está abierto
        const panel = document.getElementById('panel-notif');
        if (panel && !panel.classList.contains('hidden')) {
            const items = await fetchVista('mis_notificaciones_no_leidas');
            renderLista(items);
        }
    }

    // ─── Funciones globales expuestas ───────────────────────────────────────
    window.toggleNotif = async function() {
        const panel = document.getElementById('panel-notif');
        if (!panel) return;
        const seVaAAbrir = panel.classList.contains('hidden');
        panel.classList.toggle('hidden');

        if (seVaAAbrir) {
            // Mostrar spinner y cargar
            const cont = document.getElementById('lista-notif');
            if (cont) {
                cont.innerHTML = `
                    <div class="text-center py-8">
                        <i class="fa-solid fa-spinner fa-spin text-2xl text-primary"></i>
                    </div>`;
            }
            const items = await fetchVista('mis_notificaciones_no_leidas');
            renderLista(items);
        }
    };

    window.marcarNotifLeida = async function(id) {
        await rpc('marcar_notificacion_leida', { p_id_notificacion: id });
        await cargarNotificaciones();
    };

    window.abrirNotificacion = async function(id, url) {
        // Marcar leída en background
        rpc('marcar_notificacion_leida', { p_id_notificacion: id });
        // Redirigir
        if (url && url !== 'null' && url !== 'undefined') {
            window.location.href = url;
        }
    };

    window.marcarTodasNotifLeidas = async function() {
        await rpc('marcar_todas_notificaciones_leidas');
        await cargarNotificaciones();
    };

    // Reemplaza el placeholder vacío de menu.js
    window.ejecutarMotorNotificaciones = async function() {
        if (inicializado) return;
        inicializado = true;

        // Carga inicial
        await cargarNotificaciones();

        // Polling
        if (pollingTimer) clearInterval(pollingTimer);
        pollingTimer = setInterval(() => cargarNotificaciones(true), POLLING_MS);

        // Refrescar al volver a la pestaña
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) cargarNotificaciones(true);
        });

        // Cerrar panel al hacer click fuera
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('panel-notif');
            const campana = e.target.closest('button[onclick*="toggleNotif"]');
            if (!panel || panel.classList.contains('hidden')) return;
            if (!panel.contains(e.target) && !campana) {
                panel.classList.add('hidden');
            }
        });
    };

    // Auto-arranque si menu.js ya cargó la campana
    document.addEventListener('DOMContentLoaded', () => {
        // Espera a que menu.js inyecte la campana (50ms es suficiente)
        setTimeout(() => {
            if (document.getElementById('badge-notif')) {
                window.ejecutarMotorNotificaciones();
            }
        }, 100);
    });

})();
