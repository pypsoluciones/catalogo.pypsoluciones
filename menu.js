document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop() || 'admin_dashboard.html';

    const estiloActivoSub = "bg-white/10 text-white font-bold border-l-4 border-secondary pl-2 shadow-inner backdrop-blur-sm";
    const estiloInactivoSub = "text-gray-400 hover:text-white hover:bg-white/5 pl-2";

    // 1. INYECCIÓN DEL MENÚ LATERAL (SISTEMA COMPLETO)
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
                <button type="button" onclick="document.getElementById('submenu-ven').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_ventas') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-cash-register mr-3 w-4"></i> Ventas (POS)</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-ven" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_ventas') ? '' : 'hidden'}">
                    <a href="admin_ventas.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_ventas.html' ? estiloActivoSub : estiloInactivoSub}">Terminal POS</a>
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
                    <a href="admin_compras_ingreso.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_compras_ingreso.html' ? estiloActivoSub : estiloInactivoSub}">Ingresar Compra</a>
                    <a href="admin_compras_historial.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_compras_historial.html' ? estiloActivoSub : estiloInactivoSub}">Historial</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-fin').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_cxc') || currentPage.includes('admin_caja') || currentPage.includes('admin_bancos') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-vault mr-3 w-4"></i> Finanzas & Caja</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-fin" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_cxc') || currentPage.includes('admin_caja') || currentPage.includes('admin_bancos') ? '' : 'hidden'}">
                    <a href="admin_caja.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_caja.html' ? estiloActivoSub : estiloInactivoSub}">Control de Caja</a>
                    <a href="admin_cxc.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_cxc.html' ? estiloActivoSub : estiloInactivoSub}">Cuentas por Cobrar</a>
                    <a href="admin_bancos_finanzas.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_bancos_finanzas.html' ? estiloActivoSub : estiloInactivoSub}">Tesorería y Bancos</a>
                </div>
            </div>
            
            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-inv').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_productos') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-boxes-stacked mr-3 w-4"></i> Inventario</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-inv" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_productos') ? '' : 'hidden'}">
                    <a href="admin_productos.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_productos.html' ? estiloActivoSub : estiloInactivoSub}">Productos</a>
                    <a href="admin_productos_parametros.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_productos_parametros.html' ? estiloActivoSub : estiloInactivoSub}">Parámetros</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-tal').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_taller') || currentPage.includes('admin_rma') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-screwdriver-wrench mr-3 w-4"></i> Taller y RMA</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-tal" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_taller') || currentPage.includes('admin_rma') ? '' : 'hidden'}">
                    <a href="admin_taller.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_taller.html' ? estiloActivoSub : estiloInactivoSub}">Servicio Técnico</a>
                    <a href="admin_rma.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_rma.html' ? estiloActivoSub : estiloInactivoSub}">Garantías (RMA)</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-dir').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_contactos') || currentPage.includes('admin_nomina') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-address-book mr-3 w-4"></i> Directorio</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-dir" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_contactos') || currentPage.includes('admin_nomina') ? '' : 'hidden'}">
                    <a href="admin_contactos.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_contactos.html' ? estiloActivoSub : estiloInactivoSub}">Clientes y Prov.</a>
                    <a href="admin_nomina.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_nomina.html' ? estiloActivoSub : estiloInactivoSub}">Nómina y Emp.</a>
                    <a href="admin_contactos_parametros.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_contactos_parametros.html' ? estiloActivoSub : estiloInactivoSub}">Parámetros</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-adm').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition text-sm ${currentPage.includes('admin_usuarios') || currentPage.includes('admin_publicidad') || currentPage.includes('admin_configuracion') ? 'bg-white/5 text-white font-bold' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-shield-halved mr-3 w-4"></i> Sistema</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-adm" class="pl-6 space-y-1 mt-1 ${currentPage.includes('admin_usuarios') || currentPage.includes('admin_publicidad') || currentPage.includes('admin_configuracion') ? '' : 'hidden'}">
                    <a href="admin_usuarios.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_usuarios.html' ? estiloActivoSub : estiloInactivoSub}">Accesos y Perfiles</a>
                    <a href="admin_publicidad.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_publicidad.html' ? estiloActivoSub : estiloInactivoSub}">Publicidad / TV</a>
                    <a href="admin_configuracion.html" class="block py-1.5 px-3 text-xs rounded-md transition-all ${currentPage === 'admin_configuracion.html' ? estiloActivoSub : estiloInactivoSub}">Marca Blanca</a>
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

    // 2. INYECCIÓN DE CAMPANITA (SE MANTIENE IGUAL)
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
                <div id="lista-notif" class="max-h-64 overflow-y-auto custom-scroll bg-slate-50 p-3 space-y-2 text-left">
                    <div class="text-center text-gray-400 text-[10px] font-bold uppercase py-4"><i class="fa-solid fa-spinner fa-spin text-xl mb-1 block"></i></div>
                </div>
            </div>
        </div>`;
        headerRight.insertAdjacentHTML('afterbegin', notifHTML);
    }

    cargarBrandingGlobal();
    ejecutarMotorNotificaciones();
});

// FUNCIONES DE CONTROL (SE MANTIENEN IGUAL)
window.toggleMobileMenu = function() { document.getElementById('sidebar').classList.toggle('-translate-x-full'); document.getElementById('mobile-overlay').classList.toggle('hidden'); };
window.cerrarSesion = function() { if(confirm("¿Seguro que deseas salir?")) forzarCierreSesion(); };
window.forzarCierreSesion = function() { localStorage.removeItem('pyp_token_seguro'); window.location.href = 'login.html'; };
window.cargarBrandingGlobal = function() { 
    const logoPc = localStorage.getItem('pyp_logo_pc_url'); 
    if(logoPc) { 
        const imgSidebar = document.getElementById('app-logo-sidebar'); 
        const txtSidebar = document.getElementById('app-text-sidebar'); 
        if(imgSidebar) { imgSidebar.src = logoPc; imgSidebar.classList.remove('hidden'); } 
        if(txtSidebar) txtSidebar.classList.add('hidden'); 
    } 
};
window.toggleNotif = function() { document.getElementById('panel-notif').classList.toggle('hidden'); };

// Lógica de notificaciones y cierre de panel se mantiene igual para no romper Supabase...
