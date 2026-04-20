document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop() || 'admin_dashboard.html';

    const menuHTML = `
    <div id="mobile-overlay" onclick="toggleMobileMenu()" class="fixed inset-0 bg-gray-900/60 z-40 hidden backdrop-blur-sm md:hidden transition-opacity"></div>
    <aside id="sidebar" class="w-64 md:w-56 bg-[#143B62] text-white flex flex-col fixed inset-y-0 left-0 z-50 transform -translate-x-full md:translate-x-0 md:relative transition-transform duration-300 shadow-2xl md:shadow-xl">
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
        
        <nav class="flex-1 p-3 space-y-1 overflow-y-auto custom-scroll">
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

            <a href="admin_contactos.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_contactos.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-address-book sidebar-icon"></i> Directorio</a>
            
            <a href="admin_nomina.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_nomina.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-users-gear sidebar-icon"></i> Nómina</a>

            <a href="admin_configuracion.html" class="flex items-center rounded-md transition sidebar-link ${currentPage === 'admin_configuracion.html' ? 'bg-[#E67E22] text-white shadow-sm' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-gear sidebar-icon"></i> Configuración</a>
        </nav>
        
        <div class="p-3 border-t border-white/10 shrink-0 bg-[#0f2d4a]">
            <button onclick="cerrarSesion()" class="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white py-2 rounded-md font-medium transition text-xs shadow-sm btn-press"><i class="fa-solid fa-power-off"></i> Cerrar Sesión</button>
        </div>
    </aside>
    `;

    const errorModalsHTML = `
    <div id="pyp-modal-401" class="fixed inset-0 bg-slate-900/95 z-[99999] hidden flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all">
            <i class="fa-solid fa-shield-halved text-6xl text-[#E67E22] mb-4"></i>
            <h2 class="text-2xl font-black text-[#143B62] mb-2">Por tu seguridad</h2>
            <p class="text-gray-500 mb-6 text-sm font-medium">Tu sesión se ha cerrado automáticamente tras un periodo de inactividad para proteger los datos de tu empresa.</p>
            <button onclick="forzarCierreSesion()" class="w-full bg-[#E67E22] hover:bg-[#d67118] text-white py-3 rounded-lg font-bold shadow-md transition active:scale-95 text-lg uppercase tracking-wider">Volver a Ingresar</button>
        </div>
    </div>
    <div id="pyp-modal-offline" class="fixed inset-0 bg-slate-900/95 z-[99999] hidden flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all">
            <i class="fa-solid fa-wifi text-6xl text-red-500 mb-4 opacity-80"></i>
            <h2 class="text-2xl font-black text-[#143B62] mb-2">Sin Conexión</h2>
            <p class="text-gray-500 mb-6 text-sm font-medium">Parece que has perdido la conexión a internet. Verifica tu Wi-Fi o datos móviles para continuar trabajando.</p>
            <button onclick="window.location.reload()" class="w-full bg-[#143B62] hover:bg-[#0f2d4a] text-white py-3 rounded-lg font-bold shadow-md transition active:scale-95 text-lg uppercase tracking-wider">Reintentar</button>
        </div>
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
        if (response.status === 401) {
            document.getElementById('pyp-modal-401').classList.remove('hidden'); document.getElementById('pyp-modal-401').classList.add('flex');
            return response; 
        }
        return response;
    } catch (error) {
        if (error.name === 'TypeError' && !navigator.onLine) {
            document.getElementById('pyp-modal-offline').classList.remove('hidden'); document.getElementById('pyp-modal-offline').classList.add('flex');
        }
        throw error;
    }
};

window.toggleMobileMenu = function() { document.getElementById('sidebar').classList.toggle('-translate-x-full'); document.getElementById('mobile-overlay').classList.toggle('hidden'); };
window.cerrarSesion = function() { if(confirm("¿Estás seguro que deseas cerrar sesión?")) { forzarCierreSesion(); } };
window.forzarCierreSesion = function() { localStorage.removeItem('pyp_sesion_activa'); localStorage.removeItem('pyp_token_seguro'); localStorage.removeItem('pyp_usuario_rol'); localStorage.removeItem('pyp_usuario_nombre'); window.location.href = 'login.html'; };

window.cargarBrandingGlobal = function() {
    const logoPc = localStorage.getItem('pyp_logo_pc_url');
    
    if(logoPc) {
        // 1. Mostrar en la barra lateral (PC)
        const imgSidebar = document.getElementById('app-logo-sidebar');
        const txtSidebar = document.getElementById('app-text-sidebar');
        if(imgSidebar) { imgSidebar.src = logoPc; imgSidebar.classList.remove('hidden'); }
        if(txtSidebar) txtSidebar.classList.add('hidden');
        
        // 2. Mostrar en la cabecera superior (Móviles) usando el MISMO logo de PC
        const imgHeader = document.getElementById('app-logo-header');
        const txtHeader = document.getElementById('app-text-header');
        const iconHeader = document.getElementById('app-icon-header');
        
        if(imgHeader) { 
            imgHeader.src = logoPc; 
            imgHeader.classList.remove('hidden'); 
            imgHeader.classList.add('block', 'md:hidden'); 
        }
        
        // Ocultar texto e icono en móviles para que el logo tenga todo el espacio y no se atraviese
        if(txtHeader) txtHeader.classList.add('hidden', 'md:flex');
        if(iconHeader) iconHeader.classList.add('hidden');
    }
};
    
    const logoMovil = localStorage.getItem('pyp_logo_movil_url');
    if(logoMovil) {
        const imgHeader = document.getElementById('app-logo-header');
        const iconHeader = document.getElementById('app-icon-header');
        
        if(imgHeader) { 
            imgHeader.src = logoMovil; 
            imgHeader.classList.remove('hidden'); 
            imgHeader.classList.add('block', 'md:hidden'); 
        }
        if(iconHeader) iconHeader.classList.add('hidden'); // Oculta el iconito genérico para darle el protagonismo total al Logo.
    }
};
