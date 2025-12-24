// 1. Helpers Modernos
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// 2. Inicialización General
document.addEventListener('DOMContentLoaded', () => {
    if ($('#year')) $('#year').textContent = new Date().getFullYear();

    initTypewriter();
    initScrollObserver();
    initContactForm();
});


/* ===== ANIMATE ON SCROLL (Optimized) ===== */
function initScrollObserver() {
    const options = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px" // Se activa un poco antes de llegar
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('inview');
                // Si quieres que solo se anime una vez, deja de observar:
                // observer.unobserve(entry.target); 
            }
        });
    }, options);

    $$('.animate-on-scroll, [data-animate]').forEach(el => observer.observe(el));
}

/* ===== CONTACT FORM (Apple Style with SweetAlert2) ===== */
function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validación simple
        if (!data.name || !data.email || !data.message) {
            return Swal.fire({
                icon: 'warning',
                title: 'CAMPOS INCOMPLETOS',
                text: 'Por favor, llena todos los datos para continuar, bro.',
                background: '#0f1115',
                color: '#fff',
                confirmButtonColor: '#0066cc'
            });
        }

        // Simulación de envío con estilo Apple
        Swal.fire({
            title: 'Enviando mensaje...',
            html: 'Conectando con el servidor seguro.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
            background: '#0f1115',
            color: '#fff'
        });

        // Simular delay de red
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: '¡MENSAJE ENVIADO!',
                text: 'Gracias Kevin, te responderé lo más pronto posible.',
                background: '#0f1115',
                color: '#fff',
                confirmButtonColor: '#0066cc',
                showConfirmButton: false,
                timer: 2500
            });
            form.reset();
        }, 1500);
    });
}