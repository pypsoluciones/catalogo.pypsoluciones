/* ═══════════════════════════════════════════════════════════════════════════
   P&P ERP — MENÚ LATERAL GLOBAL v2 (Sprint 5 reorganizado)
   ═══════════════════════════════════════════════════════════════════════════
   Cambios v2:
   - "Ventas (POS)" → "Ventas"
   - Notas de Entrega y Cotizaciones movidos DENTRO de Ventas
   - Eliminada pestaña independiente "Notas de Entrega"
   - "Gestión de Compras" → "Factura de Compra"
   - "Maestro de Productos" → "Productos"
   - "Finanzas & Caja" → "Finanzas"
   - "Bancos y Finanzas" → "Bancos y Cajas"
   - Bóveda Central NO es ítem separado (está dentro de Bancos y Cajas)
   - "Seguridad y Permisos" MOVIDO dentro de Sistema
   - Slot deshabilitado para "Facturación" (próximo sprint)
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop() || 'admin_dashboard.html';

    const estiloActivoSub = "bg-white/10 text-white font-bold border-l-4 border-secondary pl-2 shadow-inner backdrop-blur-sm";
    const estiloInactivoSub = "text-gray-400 hover:text-white hover:bg-white/5 pl-2";
    const estiloDeshabilitado = "text-gray-600 cursor-not-allowed pl-2 italic";

    const menuHTML = `
    <div id="mobile-overlay" onclick="toggleMobileMenu()" class="fixed inset-0 bg-gray-900/60 z-40 hidden backdrop-blur-sm md:hidden transition-opacity"></div>
    <aside id="sidebar" class="w-64 md:w-56 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-50 transform -translate-x-full md:translate-x-0 md:relative transition-transform duration-300 shadow-2xl md:shadow-xl">
        
        <div class="p-3 border-b border-white/10 flex items-center justify-center shrink-0 h-16">
            <div class="flex items-center justify-start w-full h-full">
                <img id="app-logo-sidebar" src="" class="max-h-12 w-full object-contain object-left hidden">
                <div id="app-text-sidebar" class="flex items-center gap-3">
                    <i class="fa-solid fa-layer-group text-tertiary text-xl"></i>
                    <h2 class="font-semibold text-base tracking-wide">P&P Admin</h2>
                </div>
            </div>
            <button onclick="toggleMobileMenu()" class="md:hidden text-gray-300 hover:text-white text-xl ml-2"><i class="fa-solid fa-times"></i></button>
        </div>
        
        <nav class="flex-1 p-2 space-y-1 overflow-y-auto custom-scroll pb-6">
            
            <a href="admin_dashboard.html" class="flex items-center p-2 rounded-md transition text-sm ${currentPage === 'admin_dashboard.html' ? 'bg-white text-primary font-black shadow-md' : 'text-gray-300 hover:bg-white/10'}">
                <i class="fa-solid fa-chart-pie mr-3 w-4"></i> Dashboard
            </a>
            
            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-ven').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_ventas') || currentPage.includes('admin_facturacion') || currentPage.includes('admin_cotizaciones') || currentPage.includes('admin_notas') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-cash-register mr-3 w-4"></i> Ventas</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-ven" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_ventas') || currentPage.includes('admin_facturacion') || currentPage.includes('admin_cotizaciones') || currentPage.includes('admin_notas') ? '' : 'hidden'}">
                    <a href="admin_ventas.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_ventas.html' ? estiloActivoSub : estiloInactivoSub}">POS</a>
                    <span class="block py-1.5 px-3 text-xs rounded-md ${estiloDeshabilitado}" title="Próximo sprint">Facturación <i class="fa-solid fa-clock text-[8px] ml-1"></i></span>
                    <a href="admin_ventas_presupuestos.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_ventas_presupuestos.html' ? estiloActivoSub : estiloInactivoSub}">Presupuestos</a>
                    <a href="admin_ventas_notas.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_ventas_notas.html' ? estiloActivoSub : estiloInactivoSub}">Notas de Entrega</a>
                    <a href="admin_ventas_historial.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_ventas_historial.html' ? estiloActivoSub : estiloInactivoSub}">Historial de Ventas</a>
                    <a href="admin_ventas_parametros.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_ventas_parametros.html' ? estiloActivoSub : estiloInactivoSub}">Parámetros POS</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-com').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_compras') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-cart-shopping mr-3 w-4"></i> Compras</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-com" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_compras') ? '' : 'hidden'}">
                    <a href="admin_compras.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_compras.html' ? estiloActivoSub : estiloInactivoSub}">Factura de Compra</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-inv').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_productos') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-boxes-stacked mr-3 w-4"></i> Inventario</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-inv" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_productos') ? '' : 'hidden'}">
                    <a href="admin_productos.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_productos.html' ? estiloActivoSub : estiloInactivoSub}">Productos</a>
                    <a href="admin_productos_parametros.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_productos_parametros.html' ? estiloActivoSub : estiloInactivoSub}">Parámetros de Productos</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-fin').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_cxc') || currentPage.includes('admin_caja') || currentPage.includes('admin_verificacion') || currentPage.includes('admin_bancos') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-landmark mr-3 w-4"></i> Finanzas</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-fin" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_cxc') || currentPage.includes('admin_caja') || currentPage.includes('admin_verificacion') || currentPage.includes('admin_bancos') ? '' : 'hidden'}">
                    <a href="admin_bancos_finanzas.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_bancos_finanzas.html' ? estiloActivoSub : estiloInactivoSub}">Bancos y Cajas</a>
                    <a href="admin_caja.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_caja.html' ? estiloActivoSub : estiloInactivoSub}">Control de Caja</a>
                    <a href="admin_verificacion_cierres.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_verificacion_cierres.html' ? estiloActivoSub : estiloInactivoSub}">
                        <span class="flex items-center justify-between">
                            <span>Verificación de Cierres</span>
                            <span id="badge-cierres-pend" class="hidden bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">0</span>
                        </span>
                    </a>
                    <a href="admin_cxc.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_cxc.html' ? estiloActivoSub : estiloInactivoSub}">Cuentas por Cobrar</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-tal').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_taller') || currentPage.includes('admin_rma') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-screwdriver-wrench mr-3 w-4"></i> Taller y RMA</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-tal" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_taller') || currentPage.includes('admin_rma') ? '' : 'hidden'}">
                  <a href="admin_servicios.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_servicios.html' ? estiloActivoSub : estiloInactivoSub}">Servicios</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-dir').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_contactos') || currentPage.includes('admin_nomina') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-address-book mr-3 w-4"></i> Directorio</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-dir" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_contactos') || currentPage.includes('admin_nomina') ? '' : 'hidden'}">
                    <a href="admin_contactos.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_contactos.html' ? estiloActivoSub : estiloInactivoSub}">Clientes / Proveedores</a>
                    <a href="admin_nomina.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_nomina.html' ? estiloActivoSub : estiloInactivoSub}">Personal / Nómina</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-sis').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_seguridad') || currentPage.includes('admin_empleados_roles') || currentPage.includes('admin_configuracion') || currentPage.includes('admin_perfil') || currentPage.includes('admin_publicidad') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-gears mr-3 w-4"></i> Sistema</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-sis" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_seguridad') || currentPage.includes('admin_empleados_roles') || currentPage.includes('admin_configuracion') || currentPage.includes('admin_perfil') || currentPage.includes('admin_publicidad') ? '' : 'hidden'}">
                    <a href="admin_seguridad.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_seguridad.html' ? estiloActivoSub : estiloInactivoSub}">
                        <i class="fa-solid fa-shield-halved mr-1 text-[10px]"></i> Seguridad y Permisos
                    </a>
                    <a href="admin_perfil.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_perfil.html' ? estiloActivoSub : estiloInactivoSub}">Mi Perfil y PIN</a>
                    <a href="admin_empleados_roles.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_empleados_roles.html' ? estiloActivoSub : estiloInactivoSub}">Empleados y Roles</a>
                    <a href="admin_publicidad.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_publicidad.html' ? estiloActivoSub : estiloInactivoSub}">Publicidad TV</a>
                    <a href="admin_configuracion.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_configuracion.html' ? estiloActivoSub : estiloInactivoSub}">Parámetros del Sistema</a>
                </div>
            </div>

            <hr class="border-white/10 my-4">

            <div class="px-2 pb-2">
                <p class="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-2 px-1">Web Externas</p>
                <div class="grid grid-cols-1 gap-1">
                    <a href="index.html" target="_blank" class="flex items-center p-2 rounded-md text-xs text-gray-400 hover:bg-secondary hover:text-white transition">
                        <i class="fa-solid fa-globe mr-3 w-4"></i> Landing Page
                    </a>
                    <a href="web.html" target="_blank" class="flex items-center p-2 rounded-md text-xs text-gray-400 hover:bg-secondary hover:text-white transition">
                        <i class="fa-solid fa-store mr-3 w-4"></i> Catálogo Público
                    </a>
                </div>
            </div>

        </nav>
        
        <div class="p-3 border-t border-white/10 shrink-0 bg-black/20">
            <button onclick="cerrarSesion()" class="w-full flex items-center justify-center gap-2 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white py-2.5 rounded font-bold transition text-xs shadow-sm border border-transparent hover:border-gray-500 uppercase tracking-wider">
                <i class="fa-solid fa-power-off text-gray-400"></i> Cerrar Sesión
            </button>
        </div>
    </aside>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    // Inyectar campana de notificaciones en el header (si existe)
    const headerRight = document.querySelector('header > div:last-child');
    if (headerRight) {
        const notifHTML = `
        <div class="relative flex items-center justify-center z-[9990] mr-2">
            <button onclick="toggleNotif()" class="text-gray-400 hover:text-secondary transition text-xl relative btn-press px-1" title="Centro de Alertas">
                <i class="fa-solid fa-bell"></i>
                <span id="badge-notif" class="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm hidden">0</span>
            </button>
            <div id="panel-notif" class="hidden absolute top-10 right-0 w-72 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden" style="animation: fadeIn 0.2s ease-out; transform-origin: top right;">
                <div class="bg-primary px-4 py-3 text-white font-bold text-[11px] uppercase tracking-widest flex justify-between items-center">
                    <span><i class="fa-solid fa-bell mr-2 text-secondary"></i> Alertas</span>
                    <button onclick="toggleNotif()" class="text-white/50 hover:text-white"><i class="fa-solid fa-times"></i></button>
                </div>
                <div id="lista-notif" class="max-h-80 overflow-y-auto custom-scroll bg-slate-50 p-3 text-left">
                    <div class="text-center text-gray-400 py-4"><i class="fa-solid fa-spinner fa-spin text-xl"></i></div>
                </div>
            </div>
        </div>`;
        headerRight.insertAdjacentHTML('afterbegin', notifHTML);
    }

    cargarBrandingGlobal();

    if (!document.querySelector('script[src*="notificaciones.js"]')) {
        const s = document.createElement('script');
        s.src = 'notificaciones.js';
        s.onload = () => {
            if (typeof window.ejecutarMotorNotificaciones === 'function') {
                window.ejecutarMotorNotificaciones();
            }
        };
        document.head.appendChild(s);
    } else {
        if (typeof window.ejecutarMotorNotificaciones === 'function') {
            window.ejecutarMotorNotificaciones();
        }
    }

    cargarBadgeCierresPendientes();

    // ── Barra de navegación inferior (solo móvil) ──────────────────────────
    const navItems = [
        { href: 'admin_dashboard.html',  icon: 'fa-chart-pie',          label: 'Inicio',    match: 'admin_dashboard' },
        { href: 'admin_ventas.html',     icon: 'fa-file-invoice',        label: 'Ventas',    match: 'admin_ventas'    },
        { href: 'admin_caja.html',       icon: 'fa-vault',               label: 'Caja',      match: 'admin_caja'      },
        { href: 'admin_cxc.html',        icon: 'fa-hand-holding-dollar', label: 'CxC',       match: 'admin_cxc'       },
        { href: 'admin_productos.html',  icon: 'fa-boxes-stacked',       label: 'Inventario',match: 'admin_productos' },
    ];

    const bottomNavHTML = `
    <style>
        @media (max-width: 767px) {
            .pyp-bottom-nav-spacer { display: block !important; }
            main { padding-bottom: 0 !important; }
        }
    </style>
    <div class="pyp-bottom-nav-spacer" style="display:none;height:62px;flex-shrink:0;"></div>
    <nav id="pyp-bottom-nav" aria-label="Navegación principal" style="
        display: none;
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 49;
        background: #fff;
        border-top: 0.5px solid #e2e8f0;
        height: 62px;
        align-items: stretch;
        box-shadow: 0 -2px 12px rgba(0,0,0,0.07);
        font-family: var(--font-global, 'Inter', sans-serif);
    ">
        ${navItems.map(item => {
            const isActive = currentPage.includes(item.match);
            return `
            <a href="${item.href}" style="
                flex: 1; display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                gap: 3px; text-decoration: none; position: relative;
                padding: 6px 2px;
                background: ${isActive ? 'rgba(20,59,98,0.04)' : 'transparent'};
                transition: background 0.15s;
            ">
                ${isActive ? `<span style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:28px;height:2px;background:var(--color-primary,#143B62);border-radius:0 0 2px 2px;"></span>` : ''}
                ${item.match === 'admin_cxc' ? `<span id="bnav-badge-cxc" style="display:none;position:absolute;top:6px;right:calc(50% - 16px);background:#E24B4A;color:#fff;font-size:8px;font-weight:700;min-width:14px;height:14px;border-radius:7px;padding:0 3px;display:none;align-items:center;justify-content:center;border:1.5px solid #fff;"></span>` : ''}
                <i class="fa-solid ${item.icon}" style="font-size:18px;color:${isActive ? 'var(--color-primary,#143B62)' : '#94a3b8'};"></i>
                <span style="font-size:9px;font-weight:700;color:${isActive ? 'var(--color-primary,#143B62)' : '#94a3b8'};text-transform:uppercase;letter-spacing:0.05em;">${item.label}</span>
            </a>`;
        }).join('')}
    </nav>`;

    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

    // Mostrar/ocultar según ancho de pantalla
    const bNav = document.getElementById('pyp-bottom-nav');
    const bNavSpacer = document.querySelector('.pyp-bottom-nav-spacer');
    function toggleBottomNav() {
        const isMobile = window.innerWidth < 768;
        if (bNav) bNav.style.display = isMobile ? 'flex' : 'none';
        if (bNavSpacer) bNavSpacer.style.display = isMobile ? 'block' : 'none';
    }
    toggleBottomNav();
    window.addEventListener('resize', toggleBottomNav);

    // Badge CxC: carga el conteo de facturas vencidas/por cobrar
    cargarBadgeCxC();
});

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES GLOBALES
// ═══════════════════════════════════════════════════════════════════════════

window.toggleMobileMenu = function() {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
    document.getElementById('mobile-overlay').classList.toggle('hidden');
};

window.cerrarSesion = function() {
    if (confirm("¿Seguro que deseas salir?")) forzarCierreSesion();
};

window.forzarCierreSesion = function() {
    localStorage.removeItem('pyp_token_seguro');
    window.location.href = 'login.html';
};

window.cargarBrandingGlobal = function() {
    const logoPc = localStorage.getItem('pyp_logo_pc_url');
    if (logoPc) {
        const imgSidebar = document.getElementById('app-logo-sidebar');
        const txtSidebar = document.getElementById('app-text-sidebar');
        if (imgSidebar) { imgSidebar.src = logoPc; imgSidebar.classList.remove('hidden'); }
        if (txtSidebar) txtSidebar.classList.add('hidden');
    }
};

window.toggleNotif = window.toggleNotif || function() {
    document.getElementById('panel-notif')?.classList.toggle('hidden');
};

window.cargarBadgeCierresPendientes = async function() {
    const badge = document.getElementById('badge-cierres-pend');
    if (!badge) return;
    const token = localStorage.getItem('pyp_token_seguro');
    if (!token || typeof SUPABASE_URL === 'undefined') return;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/cierres_pendientes_verificacion?select=id_cierre`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        const n = data.length || 0;
        if (n > 0) {
            badge.textContent = n > 99 ? '99+' : String(n);
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    } catch {}

    setTimeout(window.cargarBadgeCierresPendientes, 60_000);
};

window.cargarBadgeCxC = async function() {
    const badge = document.getElementById('bnav-badge-cxc');
    if (!badge) return;
    const token = localStorage.getItem('pyp_token_seguro');
    if (!token || typeof SUPABASE_URL === 'undefined') return;

    try {
        const resUser = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?select=id_empresa&limit=1`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
        });
        if (!resUser.ok) return;
        const dataUser = await resUser.json();
        const idEmpresa = dataUser[0]?.id_empresa;
        const filtro = idEmpresa ? `id_empresa=eq.${idEmpresa}&` : '';

        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/ventas_facturas?${filtro}estatus=in.(VENCIDA,POR_PAGAR,PARCIAL)&saldo_pendiente_usd=gt.0&select=id_factura`,
            { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();
        const n = data.length || 0;
        if (n > 0) {
            badge.textContent = n > 99 ? '99+' : String(n);
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    } catch {}

    setTimeout(window.cargarBadgeCxC, 120_000);
};
