frappe.pages['modern-menu'].on_page_load = function(wrapper) {
    const $wrapper = $(wrapper);
    frappe.require('/assets/frappe/desk/page/modern_menu/modern_menu.css');

    // Clean, professional header
    $wrapper.html(`
        <div class="modern-menu-container">
            <div class="modern-menu-header">
                <h1>Apps</h1>
                <p class="text-muted">Select a module to get started</p>
            </div>
            <div class="modern-menu-grid"></div>
        </div>
    `);

    let $container = $wrapper.find('.modern-menu-grid');
    
    // Get Data
    let items = frappe.boot.allowed_workspaces || [];
    
    // Filter: Hide "Home" and "Settings" if you want a cleaner look
    // items = items.filter(w => !w.public && w.name !== 'Home'); 
    // For now, let's just hide public/website pages
    items = items.filter(w => !w.public);

    if (items.length === 0) {
        // Fallback for edge cases
        items = Object.values(frappe.workspaces || {});
    }

    items.forEach(item => {
        let title = item.title || item.name;
        let slug = frappe.router.slug(title);
        let icon = item.icon || 'folder';
        
        // Icon handling
        let icon_html = (icon.includes('<svg')) ? icon : '<span class="emoji-icon">📦</span>';

        let card = `
            <div class="menu-card" onclick="frappe.set_route('${slug}')">
                <div class="card-icon-wrapper">
                    ${icon_html}
                </div>
                <h3 class="card-title">${title}</h3>
            </div>
        `;
        $container.append(card);
    });
}