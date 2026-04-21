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
        
        <nav class="flex-1 p-3 space-y-1 overflow-y-auto custom-scroll pb-20 md:pb-3">
            <a href="admin_dashboard.html" class="flex items-center p-2 rounded-md transition ${currentPage === 'admin_dashboard.html' ? 'bg-[#E67E22] text-white' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-chart-pie mr-3 w-5"></i> Dashboard</a>
            <a href="admin_ventas.html" class="flex items-center p-2 rounded-md transition ${currentPage === 'admin_ventas.html' ? 'bg-[#E67E22] text-white' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-cash-register mr-3 w-5"></i> Ventas (POS)</a>
            
            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-inv').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition ${currentPage.includes('admin_productos') ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-boxes-stacked mr-3 w-5"></i> Inventario</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-inv" class="pl-8 space-y-1 mt-1 ${currentPage.includes('admin_productos') ? '' : 'hidden'}">
                    <a href="admin_productos.html" class="block py-1.5 text-xs ${currentPage === 'admin_productos.html' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}">Productos</a>
                    <a href="admin_productos_parametros.html" class="block py-1.5 text-xs ${currentPage === 'admin_productos_parametros.html' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}">Parámetros</a>
                </div>
            </div>

            <div class="space-y-1 pt-1">
                <button type="button" onclick="document.getElementById('submenu-dir').classList.toggle('hidden')" class="w-full flex items-center justify-between p-2 rounded-md transition ${currentPage.includes('admin_contactos') ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10'}">
                    <div class="flex items-center"><i class="fa-solid fa-address-book mr-3 w-5"></i> Directorio</div>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div id="submenu-dir" class="pl-8 space-y-1 mt-1 ${currentPage.includes('admin_contactos') ? '' : 'hidden'}">
                    <a href="admin_contactos.html" class="block py-1.5 text-xs ${currentPage === 'admin_contactos.html' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}">Contactos</a>
                    <a href="admin_contactos_parametros.html" class="block py-1.5 text-xs ${currentPage === 'admin_contactos_parametros.html' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}">Parámetros</a>
                </div>
            </div>

            <a href="admin_configuracion.html" class="flex items-center p-2 rounded-md transition ${currentPage === 'admin_configuracion.html' ? 'bg-[#E67E22] text-white' : 'text-gray-300 hover:bg-white/10'}"><i class="fa-solid fa-gear mr-3 w-5"></i> Configuración</a>
        </nav>
    </aside>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    cargarBrandingGlobal();
});

window.toggleMobileMenu = function() { document.getElementById('sidebar').classList.toggle('-translate-x-full'); document.getElementById('mobile-overlay').classList.toggle('hidden'); };

window.cargarBrandingGlobal = function() {
    const logoPc = localStorage.getItem('pyp_logo_pc_url');
    if(logoPc) {
        const imgSidebar = document.getElementById('app-logo-sidebar');
        const txtSidebar = document.getElementById('app-text-sidebar');
        if(imgSidebar) { imgSidebar.src = logoPc; imgSidebar.classList.remove('hidden'); }
        if(txtSidebar) txtSidebar.classList.add('hidden');
    }
};
