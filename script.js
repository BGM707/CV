document.addEventListener('DOMContentLoaded', function () {
    initializeAOS();
    initializeNavbar();
    initializeSmoothScroll();
    initializeContactForm();
    initializeTypeWriter();
    initializeProjectFilters();
    initializeLazyLoading();
    initializeLoader();
    initializeModal();
    initializeScrollToTop();
    initializeThemeToggle();
    initializeColorPalette();
    initializeQuotationCalculator();
    initializeLazyLoadVideo();
    initializeInfoAlerts();
    initializeCacheVideos();
});

function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            if (!validateForm(data)) {
                showNotification('Please fill in all fields correctly', 'error');
                return;
            }

            try {
                await sendEmail(data);
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Error sending message. Please try again.', 'error');
            }
        });
    }
}

async function sendEmail(data) {
    const response = await fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.text();
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Adjust according to the phone format of your country

    if (!data.name || data.name.length < 2) return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.phone || !phoneRegex.test(data.phone)) return false;
    if (!data.message || data.message.length < 10) return false;

    return true;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initializeTypeWriter() {
    const text = document.querySelector('.hero-subtitle');
    if (text) {
        const words = [
            'FullStack Developer',
            'Python Developer',
            'IOS Developer',
            'Problem Solver',
            'WebSite Maker',
            '풀스택 개발자', // Korean
            ' フルスタック開発者', // Japanese
            ' ウェブサイトビルダー', // Japanese
            ' アプリ作成者', // Japanese
            '앱 제작자', // Korean
            'app-skaper', // Norwegian
            'skaper av digital virksomhet', // Norwegian
            'mea hana kikohoʻe pāʻoihana', // Hawaiian
            'créateur d\'entreprise numérique', // French
            'creador de negocios digitales', // Spanish
            'analyste programmeur', // French
            'Analista Programador', // Spanish
            'Desenvolvedor FullStack', // Portuguese
            'Desenvolvedor Python', // Portuguese
            'Desenvolvedor IOS', // Portuguese
            'Solucionador de Problemas', // Portuguese
            'Criador de Sites', // Portuguese
            'Entwickler FullStack', // German
            'Python-Entwickler', // German
            'IOS-Entwickler', // German
            'Problemlöser', // German
            'Website-Ersteller', // German
            'Sviluppatore FullStack', // Italian
            'Sviluppatore Python', // Italian
            'Sviluppatore IOS', // Italian
            'Risolutore di Problemi', // Italian
            'Creatore di Siti Web', // Italian
            'Ontwikkelaar FullStack', // Dutch
            'Python Ontwikkelaar', // Dutch
            'IOS Ontwikkelaar', // Dutch
            'Probleemoplosser', // Dutch
            'Website Maker', // Dutch
            'Разработчик FullStack', // Russian
            'Разработчик Python', // Russian
            'Разработчик IOS', // Russian
            'Решатель проблем', // Russian
            'Создатель сайтов', // Russian
            'Geliştirici FullStack', // Turkish
            'Python Geliştirici', // Turkish
            'IOS Geliştirici', // Turkish
            'Problem Çözücü', // Turkish
            'Web Sitesi Yapımcısı', // Turkish
            'Mimari FullStack', // Swahili
            'Mhandisi Python', // Swahili
            'Mhandisi IOS', // Swahili
            'Mwathibiti wa Matatizo', // Swahili
            'Mtengenezaji wa Tovuti', // Swahili
            'Umbutho obukhulu obusebenza ngokweqile', // Zulu
            'Umbutho wokuqala uPython', // Zulu
            'Umbutho wokuqala uIOS', // Zulu
            'Umbutho wokuthatha imibono', // Zulu
            'Umbutho wokwenza iwebhusayithi', // Zulu
            'מטור FullStack', // Arabic
            'מטור Python', // Arabic
            'מטור IOS', // Arabic
            'حلال مشاكل', // Arabic
            'صانع مواقع', // Arabic
            'פיתוח מלא FullStack', // Hebrew
            'מפתח Python', // Hebrew
            'מפתח IOS', // Hebrew
            'פותר בעיות', // Hebrew
            'יוצר אתרים', // Hebrew
            'FullStack 开发人员', // Chinese (Simplified)
            'Python 开发人员', // Chinese (Simplified)
            'IOS 开发人员', // Chinese (Simplified)
            '问题解决者', // Chinese (Simplified)
            '网站制作人', // Chinese (Simplified)
            'FullStack 開發人員', // Chinese (Traditional)
            'Python 開發人員', // Chinese (Traditional)
            'IOS 開發人員', // Chinese (Traditional)
            '問題解決者', // Chinese (Traditional)
            '網站製作人', // Chinese (Traditional)
        ];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                text.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                text.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }

            if (!isDeleting && letterIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1500);
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }

        type();
    }
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.card');

    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projects.forEach(project => {
                    const projectType = project.dataset.type;
                    if (filter === 'all' || filter === projectType) {
                        project.style.display = 'block';
                        project.classList.add('show');
                    } else {
                        project.style.display = 'none';
                        project.classList.remove('show');
                    }
                });
            });
        });
    }
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = themeToggle.querySelector('.bi-sun-fill');
    const moonIcon = themeToggle.querySelector('.bi-moon-fill');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');

            sunIcon.style.display = isDarkTheme ? 'none' : 'inline';
            moonIcon.style.display = isDarkTheme ? 'inline' : 'none';
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }
}

function initializeColorPalette() {
    const colorToggle = document.querySelector('.color-toggle');
    const colorPaletteModal = document.querySelector('#colorPaletteModal');
    const closeColorModal = colorPaletteModal.querySelector('.close-modal');
    const colorOptions = document.querySelectorAll('.color-option');

    if (colorToggle) {
        colorToggle.addEventListener('click', () => {
            colorPaletteModal.classList.add('show');
        });
    }

    if (closeColorModal) {
        closeColorModal.addEventListener('click', () => {
            colorPaletteModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === colorPaletteModal) {
            colorPaletteModal.classList.remove('show');
        }
    });

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', `var(--color-${color})`);
            document.documentElement.style.setProperty('--secondary-color', `var(--color-${color}-light)`);
            document.documentElement.style.setProperty('--accent-color', `var(--color-${color}-dark)`);
            document.documentElement.style.setProperty('--text-color', `var(--color-${color}-text)`);
            document.documentElement.style.setProperty('--background-color', `var(--color-${color}-bg)`);
            colorPaletteModal.classList.remove('show');
        });
    });
}

function initializeLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
        });
    }
}

function initializeModal() {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function initializeScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeQuotationCalculator() {
    const descriptions = {
        inputs: {
            title: "¿Qué es un Input?",
            desc: "Un input es un campo donde los usuarios pueden ingresar información. Por ejemplo: formularios de contacto, campos de búsqueda, o formularios de registro.",
            examples: "Ejemplo: Un abogado necesita un formulario para que sus clientes soliciten citas (formulario simple) vs un sistema completo de gestión de casos legales (sistema complejo).",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "¿Qué es un Output?",
            desc: "Un output es cualquier información que el sistema muestra al usuario, como resultados de búsqueda, listados o reportes.",
            examples: "Ejemplo: Un músico que quiere mostrar sus próximos eventos (simple) vs un sistema de venta de boletos con reportes de ventas (complejo).",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "¿Qué es un Layout?",
            desc: "Un layout es el diseño y estructura visual de una página. Cada sección diferente de tu sitio puede requerir un layout distinto.",
            examples: "Ejemplo: Una página de inicio vs una página de contacto vs una galería de fotos.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Páginas Informativas",
            desc: "Páginas que muestran información estática como 'Acerca de', 'Servicios', o 'Contacto'.",
            examples: "Ejemplo: La página de presentación de un abogado vs un blog legal completo.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Páginas Interactivas",
            desc: "Páginas donde los usuarios pueden interactuar, como formularios, calendarios o sistemas de reserva.",
            examples: "Ejemplo: Un calendario de eventos simple vs un sistema de reservas en tiempo real.",
            cost: 200,
            time: 2
        },
        api: {
            title: "Integración de APIs",
            desc: "Una API permite que tu sitio se conecte con otros servicios. Por ejemplo, pagos en línea, mapas, o redes sociales.",
            examples: "Ejemplo: Mostrar un mapa de Google vs integrar un sistema completo de pagos.",
            cost: 300,
            time: 2
        }
    };

    const formData = {
        inputs: 0,
        outputs: 0,
        layouts: 0,
        informative: 0,
        interactive: 0,
        api: 0
    };

    const totalCost = document.querySelector('#estimated-cost');
    const totalTime = document.querySelector('#estimated-time');

    function calculateTotal() {
        let cost = 0;
        let time = 0;

        Object.entries(formData).forEach(([key, value]) => {
            if (descriptions[key]) {
                cost += value * descriptions[key].cost;
                time += value * descriptions[key].time;
            }
        });

        totalCost.textContent = cost;
        totalTime.textContent = time;

        // Show recommendation based on total
        if (cost > 5000) {
            Swal.fire({
                title: '¡Proyecto Complejo!',
                text: 'Tu proyecto parece ser bastante complejo. ¿Te gustaría agendar una reunión para discutir los detalles?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Agendar Reunión',
                cancelButtonText: 'Seguir Cotizando'
            });
        }
    }

    function updateField(field, value) {
        formData[field] = parseInt(value) || 0;
        calculateTotal();
    }

    function showInfo(type) {
        Swal.fire({
            title: descriptions[type].title,
            html: `
              <p>${descriptions[type].desc}</p>
              <p class="mt-3"><strong>Ejemplo:</strong><br>${descriptions[type].examples}</p>
            `,
            icon: 'info',
            confirmButtonText: 'Entendido'
        });
    }

    document.querySelectorAll('.modal input[type="number"]').forEach(input => {
        input.addEventListener('input', (e) => {
            updateField(e.target.id, e.target.value);
        });
    });

    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            showInfo(type);
        });
    });
}

function initializeLazyLoadVideo() {
    const lazyVideos = document.querySelectorAll('.hero-video.lazy, iframe[data-src]');

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.classList.remove('lazy');
                observer.unobserve(video);
            }
        });
    });

    lazyVideos.forEach(video => videoObserver.observe(video));
}

function initializeInfoAlerts() {
    const descriptions = {
        inputs: {
            title: "¿Qué es un Input?",
            desc: "Un input es un campo donde los usuarios pueden ingresar información. Por ejemplo: formularios de contacto, campos de búsqueda, o formularios de registro.",
            examples: "Ejemplo: Un abogado necesita un formulario para que sus clientes soliciten citas (formulario simple) vs un sistema completo de gestión de casos legales (sistema complejo)."
        },
        outputs: {
            title: "¿Qué es un Output?",
            desc: "Un output es cualquier información que el sistema muestra al usuario, como resultados de búsqueda, listados o reportes.",
            examples: "Ejemplo: Un músico que quiere mostrar sus próximos eventos (simple) vs un sistema de venta de boletos con reportes de ventas (complejo)."
        },
        layouts: {
            title: "¿Qué es un Layout?",
            desc: "Un layout es el diseño y estructura visual de una página. Cada sección diferente de tu sitio puede requerir un layout distinto.",
            examples: "Ejemplo: Una página de inicio vs una página de contacto vs una galería de fotos."
        },
        informative: {
            title: "Páginas Informativas",
            desc: "Páginas que muestran información estática como 'Acerca de', 'Servicios', o 'Contacto'.",
            examples: "Ejemplo: La página de presentación de un abogado vs un blog legal completo."
        },
        interactive: {
            title: "Páginas Interactivas",
            desc: "Páginas donde los usuarios pueden interactuar, como formularios, calendarios o sistemas de reserva.",
            examples: "Ejemplo: Un calendario de eventos simple vs un sistema de reservas en tiempo real."
        },
        api: {
            title: "Integración de APIs",
            desc: "Una API permite que tu sitio se conecte con otros servicios. Por ejemplo, pagos en línea, mapas, o redes sociales.",
            examples: "Ejemplo: Mostrar un mapa de Google vs integrar un sistema completo de pagos."
        }
    };

    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            Swal.fire({
                title: descriptions[type].title,
                html: `
                  <p>${descriptions[type].desc}</p>
                  <p class="mt-3"><strong>Ejemplo:</strong><br>${descriptions[type].examples}</p>
                `,
                icon: 'info',
                confirmButtonText: 'Entendido'
            });
        });
    });
}

function initializeCacheVideos() {
    const lazyVideos = document.querySelectorAll('.hero-video.lazy, iframe[data-src]');

    lazyVideos.forEach(video => {
        const src = video.dataset.src;
        if (src) {
            const cachedVideo = localStorage.getItem(src);
            if (cachedVideo) {
                video.src = cachedVideo;
                video.classList.remove('lazy');
            } else {
                video.src = src;
                localStorage.setItem(src, src);
            }
        }
    });
}

function showModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const totalCost = document.getElementById('estimated-cost').textContent;
    const totalTime = document.getElementById('estimated-time').textContent;

    const formData = {
        inputs: document.querySelector('#inputs').value,
        outputs: document.querySelector('#outputs').value,
        layouts: document.querySelector('#layouts').value,
        informative: document.querySelector('#informative').value,
        interactive: document.querySelector('#interactive').value,
        api: document.querySelector('#api').value
    };

    const descriptions = {
        inputs: {
            title: "Inputs",
            desc: "Un input es un campo donde los usuarios pueden ingresar información. Por ejemplo: formularios de contacto, campos de búsqueda, o formularios de registro.",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "Outputs",
            desc: "Un output es cualquier información que el sistema muestra al usuario, como resultados de búsqueda, listados o reportes.",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "Layouts",
            desc: "Un layout es el diseño y estructura visual de una página. Cada sección diferente de tu sitio puede requerir un layout distinto.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Páginas Informativas",
            desc: "Páginas que muestran información estática como 'Acerca de', 'Servicios', o 'Contacto'.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Páginas Interactivas",
            desc: "Páginas donde los usuarios pueden interactuar, como formularios, calendarios o sistemas de reserva.",
            cost: 200,
            time: 2
        },
        api: {
            title: "Integración de APIs",
            desc: "Una API permite que tu sitio se conecte con otros servicios. Por ejemplo, pagos en línea, mapas, o redes sociales.",
            cost: 300,
            time: 2
        }
    };

    let yOffset = 10;

    doc.text('Cotización del Proyecto', 10, yOffset);
    yOffset += 10;

    Object.entries(formData).forEach(([key, value]) => {
        if (value > 0) {
            doc.text(`${descriptions[key].title}: ${value}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Descripción: ${descriptions[key].desc}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Costo: $${descriptions[key].cost * value}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Tiempo: ${descriptions[key].time * value} días`, 10, yOffset);
            yOffset += 20;
        }
    });

    doc.text(`Costo Total: $${totalCost}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Tiempo Estimado: ${totalTime} días`, 10, yOffset);

    doc.save('cotizacion.pdf');
}

function exportToExcel() {
    const totalCost = document.getElementById('estimated-cost').textContent;
    const totalTime = document.getElementById('estimated-time').textContent;

    const formData = {
        inputs: document.querySelector('#inputs').value,
        outputs: document.querySelector('#outputs').value,
        layouts: document.querySelector('#layouts').value,
        informative: document.querySelector('#informative').value,
        interactive: document.querySelector('#interactive').value,
        api: document.querySelector('#api').value
    };

    const descriptions = {
        inputs: {
            title: "Inputs",
            desc: "Un input es un campo donde los usuarios pueden ingresar información. Por ejemplo: formularios de contacto, campos de búsqueda, o formularios de registro.",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "Outputs",
            desc: "Un output es cualquier información que el sistema muestra al usuario, como resultados de búsqueda, listados o reportes.",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "Layouts",
            desc: "Un layout es el diseño y estructura visual de una página. Cada sección diferente de tu sitio puede requerir un layout distinto.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Páginas Informativas",
            desc: "Páginas que muestran información estática como 'Acerca de', 'Servicios', o 'Contacto'.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Páginas Interactivas",
            desc: "Páginas donde los usuarios pueden interactuar, como formularios, calendarios o sistemas de reserva.",
            cost: 200,
            time: 2
        },
        api: {
            title: "Integración de APIs",
            desc: "Una API permite que tu sitio se conecte con otros servicios. Por ejemplo, pagos en línea, mapas, o redes sociales.",
            cost: 300,
            time: 2
        }
    };

    const data = [
        ['Cotización del Proyecto', '', '', ''],
        ['Item', 'Cantidad', 'Costo', 'Tiempo'],
    ];

    Object.entries(formData).forEach(([key, value]) => {
        if (value > 0) {
            data.push([
                descriptions[key].title,
                value,
                `$${descriptions[key].cost * value}`,
                `${descriptions[key].time * value} días`
            ]);
            data.push([descriptions[key].desc, '', '', '']);
        }
    });

    data.push(['', '', '', '']);
    data.push(['Costo Total', '', `$${totalCost}`, '']);
    data.push(['Tiempo Estimado', '', `${totalTime} días`, '']);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cotización');

    XLSX.writeFile(wb, 'cotizacion.xlsx');
}
