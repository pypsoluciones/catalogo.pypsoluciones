document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop() || 'admin_dashboard.html';

    const menuHTML = `
    <div id="mobile-overlay" onclick="toggleMobileMenu()" class="fixed inset-0 bg-gray-900/60 z-40 hidden backdrop-blur-sm md:hidden transition-opacity"></div>
    <aside id="sidebar" class="w-64 md:w-56 bg-[#143B62] text-white flex flex-col fixed inset-y-0 left-0 z-50 transform -translate-x-full md:translate-x-0 md:relative transition-transform duration-300 shadow-2xl md:shadow-xl z-50">
        <div class="p-3 border-b border-white/10 flex items-center justify-center shrink-0 h-20">
            <div class="flex items-center justify-start w-full h-full">
                <img id="app-logo-sidebar" src="" class="max-h-16 w-full object-contain object-left hidden">
                <div id="app-text-sidebar" class="flex items-center gap-3">
                    <i class="fa-solid fa-layer-group text-[#E67E22] text-2xl"></i>
                    <h2 class="font-semibold text-lg tracking-wide">P&P Admin</h2>
                </div>
            </div>
            <button onclick="toggleMobileMenu()" class="md:hidden text-gray-300 hover:text-white text-xl ml-2"><i class="fa-solid fa-times"></i></button>
        </div>
        
        <nav class="flex-1 p-3 space-y-1 overflow-y-auto custom-scroll pb-20 md:pb-3">
            <a href="admin_dashboard.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_dashboard.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-chart-pie sidebar-icon"></i> Dashboard</a>
            <a href="admin_ventas.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_ventas.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-cash-register sidebar-icon"></i> Ventas (POS)</a>
            <a href="admin_compras.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_compras.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-truck-ramp-box sidebar-icon"></i> Compras</a>
            
            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-inv').classList.toggle('hidden')" class="w-full flex items-center justify-between rounded-md transition btn-press sidebar-link ${currentPage.includes('admin_productos') ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-boxes-stacked sidebar-icon"></i> Inventario</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-inv" class="pl-9 space-y-1 mt-1 ${currentPage.includes('admin_productos') ? '' : 'hidden'}">
                    <a href="admin_productos.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_productos.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Productos</a>
                    <a href="admin_productos_parametros.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_productos_parametros.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Parámetros</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-fin').classList.toggle('hidden')" class="w-full flex items-center justify-between rounded-md transition btn-press sidebar-link ${(currentPage === 'admin_caja.html' || currentPage === 'admin_bancos.html' || currentPage === 'admin_presupuestos.html') ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-coins sidebar-icon"></i> Finanzas</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-fin" class="pl-9 space-y-1 mt-1 ${(currentPage === 'admin_caja.html' || currentPage === 'admin_bancos.html' || currentPage === 'admin_presupuestos.html') ? '' : 'hidden'}">
                    <a href="admin_caja.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_caja.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Caja Chica</a>
                    <a href="admin_bancos.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_bancos.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Bancos</a>
                    <a href="admin_presupuestos.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_presupuestos.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Presupuestos</a>
                </div>
            </div>

            <a href="admin_taller.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_taller.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-screwdriver-wrench sidebar-icon"></i> Taller / RMA</a>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-dir').classList.toggle('hidden')" class="w-full flex items-center justify-between rounded-md transition btn-press sidebar-link ${currentPage.includes('admin_contactos') || currentPage.includes('admin_directorio') ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-address-book sidebar-icon"></i> Directorio</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-dir" class="pl-9 space-y-1 mt-1 ${currentPage.includes('admin_contactos') || currentPage.includes('admin_directorio') ? '' : 'hidden'}">
                    <a href="admin_contactos.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_contactos.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Contactos</a>
                    <a href="admin_directorio_parametros.html" class="block py-1.5 text-xs pl-3 transition ${currentPage === 'admin_directorio_parametros.html' ? 'text-white font-bold border-l-2 border-[#E67E22]' : 'text-gray-400 hover:text-white font-medium'}">Parámetros</a>
                </div>
            </div>
            
            <a href="admin_nomina.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_nomina.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-users-gear sidebar-icon"></i> Nómina</a>
            <a href="admin_configuracion.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_configuracion.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-gear sidebar-icon"></i> Configuración</a>
        </nav>
        
        <div class="p-3 border-t border-white/10 shrink-0 bg-[#0f2d4a] hidden md:block">
            <button onclick="cerrarSesion()" class="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white py-2 rounded-md font-medium transition text-xs shadow-sm btn-press"><i class="fa-solid fa-power-off"></i> Cerrar Sesión</button>
        </div>
    </aside>

    <nav id="mobile-bottom-nav" class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[60] flex justify-around items-center h-16 pb-safe shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <a href="admin_dashboard.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#143B62] ${currentPage === 'admin_dashboard.html' ? 'text-[#E67E22]' : ''}">
            <i class="fa-solid fa-house text-lg mb-1"></i><span class="text-[9px] font-bold uppercase tracking-wider">Inicio</span>
        </a>
        <a href="admin_productos.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#143B62] ${currentPage.includes('admin_productos') ? 'text-[#E67E22]' : ''}">
            <i class="fa-solid fa-boxes-stacked text-lg mb-1"></i><span class="text-[9px] font-bold uppercase tracking-wider">Inventario</span>
        </a>
        <a href="admin_ventas.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#143B62] ${currentPage === 'admin_ventas.html' ? 'text-[#E67E22]' : ''}">
            <div class="bg-[#25D366] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md -mt-4 mb-0.5 border-4 border-[#f4f6f8] active:scale-95 transition">
                <i class="fa-solid fa-cash-register text-sm"></i>
            </div>
            <span class="text-[9px] font-bold uppercase tracking-wider text-[#25D366]">Facturar</span>
        </a>
        <button onclick="toggleMobileMenu()" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#143B62] btn-press">
            <i class="fa-solid fa-bars text-lg mb-1"></i><span class="text-[9px] font-bold uppercase tracking-wider">Menú</span>
        </button>
    </nav>
    `;

    const errorModalsHTML = `
    <div id="pyp-modal-401" class="fixed inset-0 bg-slate-900/95 z-[99999] hidden flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all"><i class="fa-solid fa-shield-halved text-6xl text-[#E67E22] mb-4"></i><h2 class="text-2xl font-black text-[#143B62] mb-2">Por tu seguridad</h2><p class="text-gray-500 mb-6 text-sm font-medium">Tu sesión se ha cerrado automáticamente tras un periodo de inactividad para proteger los datos de tu empresa.</p><button onclick="forzarCierreSesion()" class="w-full bg-[#E67E22] hover:bg-[#d67118] text-white py-3 rounded-lg font-bold shadow-md transition active:scale-95 text-lg uppercase tracking-wider">Volver a Ingresar</button></div>
    </div>
    <div id="pyp-modal-offline" class="fixed inset-0 bg-slate-900/95 z-[99999] hidden flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all"><i class="fa-solid fa-wifi text-6xl text-red-500 mb-4 opacity-80"></i><h2 class="text-2xl font-black text-[#143B62] mb-2">Sin Conexión</h2><p class="text-gray-500 mb-6 text-sm font-medium">Parece que has perdido la conexión a internet. Verifica tu Wi-Fi o datos móviles para continuar trabajando.</p><button onclick="window.location.reload()" class="w-full bg-[#143B62] hover:bg-[#0f2d4a] text-white py-3 rounded-lg font-bold shadow-md transition active:scale-95 text-lg uppercase tracking-wider">Reintentar</button></div>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', errorModalsHTML);
    cargarBrandingGlobal();
});

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    try {
        const response = await originalFetch(...args);
        if (response.status === 401) { document.getElementById('pyp-modal-401').classList.remove('hidden'); document.getElementById('pyp-modal-401').classList.add('flex'); return response; }
        return response;
    } catch (error) {
        if (error.name === 'TypeError' && !navigator.onLine) { document.getElementById('pyp-modal-offline').classList.remove('hidden'); document.getElementById('pyp-modal-offline').classList.add('flex'); }
        throw error;
    }
};

window.toggleMobileMenu = function() { document.getElementById('sidebar').classList.toggle('-translate-x-full'); document.getElementById('mobile-overlay').classList.toggle('hidden'); };
window.cerrarSesion = function() { if(confirm("¿Estás seguro que deseas cerrar sesión?")) { forzarCierreSesion(); } };
window.forzarCierreSesion = function() { localStorage.removeItem('pyp_sesion_activa'); localStorage.removeItem('pyp_token_seguro'); localStorage.removeItem('pyp_usuario_rol'); localStorage.removeItem('pyp_usuario_nombre'); window.location.href = 'login.html'; };

window.cargarBrandingGlobal = function() {
    const logoPc = localStorage.getItem('pyp_logo_pc_url');
    if(logoPc) {
        const imgSidebar = document.getElementById('app-logo-sidebar');
        const txtSidebar = document.getElementById('app-text-sidebar');
        if(imgSidebar) { imgSidebar.src = logoPc; imgSidebar.classList.remove('hidden'); }
        if(txtSidebar) { txtSidebar.classList.add('hidden'); }
    }
};
