/* =========================================================
   REFERENCIAS
========================================================= */

const flowers =
    document.querySelectorAll(".flower");

const messageContainer =
    document.getElementById("messageContainer");

const messageText =
    document.getElementById("messageText");

const closeButton =
    document.getElementById("closeButton");

const startButton =
    document.getElementById("startButton");

const intro =
    document.getElementById("intro");

const space =
    document.getElementById("space");

const finalContainer =
    document.getElementById("finalContainer");

const finalButton =
    document.getElementById("finalButton");

const loveContainer =
    document.getElementById("loveContainer");

const petalsContainer =
    document.getElementById("petals");

const galaxyParticles =
    document.getElementById("galaxyParticles");

const galaxyFlowerField =
    document.getElementById("galaxyFlowerField");


/* =========================================================
   FLORES DESCUBIERTAS
========================================================= */

const discoveredFlowers =
    new Set();


/* =========================================================
   INICIAR EXPERIENCIA
========================================================= */

startButton.addEventListener(
    "click",
    () => {

        intro.classList.add(
            "hidden"
        );

        setTimeout(
            () => {

                space.classList.add(
                    "visible"
                );

            },
            300
        );

    }
);


/* =========================================================
   FLORES GRANDES
========================================================= */

flowers.forEach(
    (flower, index) => {

        /*
         * No tienen animación.
         */
        flower.style.animation =
            "none";


        /*
         * Hover.
         */
        flower.addEventListener(
            "mouseenter",
            () => {

                flower.classList.add(
                    "flower-hover"
                );

            }
        );


        flower.addEventListener(
            "mouseleave",
            () => {

                flower.classList.remove(
                    "flower-hover"
                );

            }
        );


        /*
         * Click.
         */
        flower.addEventListener(
            "click",
            () => {

                const message =
                    flower.dataset.message;

                const flowerNumber =
                    index + 1;


                /*
                 * Guardar flor descubierta.
                 */
                discoveredFlowers.add(
                    flowerNumber
                );


                /*
                 * Marcar flor.
                 */
                flower.classList.add(
                    "selected"
                );


                /*
                 * Mostrar mensaje.
                 */
                messageText.innerHTML = `

                    <span class="flower-number">
                        Flor ${flowerNumber} de ${flowers.length}
                    </span>

                    <br><br>

                    ${message}

                `;


                messageContainer.classList.add(
                    "active"
                );


                console.log(
                    `Flores descubiertas: ${discoveredFlowers.size}/${flowers.length}`
                );

            }
        );

    }
);


/* =========================================================
   CERRAR MENSAJE
========================================================= */

function closeMessage() {

    messageContainer.classList.remove(
        "active"
    );


    flowers.forEach(
        (flower) => {

            flower.classList.remove(
                "selected"
            );

        }
    );


    /*
     * Si ya descubrió las 6,
     * mostrar pantalla final.
     */
    if (
        discoveredFlowers.size ===
        flowers.length
    ) {

        setTimeout(
            () => {

                finalContainer.classList.add(
                    "active"
                );

            },
            600
        );

    }

}


/* =========================================================
   BOTÓN CERRAR
========================================================= */

closeButton.addEventListener(
    "click",
    closeMessage
);


/* =========================================================
   CERRAR HACIENDO CLICK AFUERA
========================================================= */

messageContainer.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            messageContainer
        ) {

            closeMessage();

        }

    }
);


/* =========================================================
   CREAR ESTRELLAS Y POLVO
========================================================= */

function createGalaxy() {

    /*
     * Muchas partículas.
     */
    const galaxyParticleCount =
        1200;


    for (
        let i = 0;
        i < galaxyParticleCount;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.classList.add(
            "galaxy-particle"
        );


        /*
         * Algunas estrellas serán
         * más brillantes.
         */
        if (
            Math.random() > 0.90
        ) {

            particle.classList.add(
                "galaxy-bright"
            );

        }


        /*
         * Área grande.
         */
        const distance =
            Math.pow(
                Math.random(),
                0.62
            ) * 700;


        const angle =
            Math.random() *
            Math.PI *
            2;


        /*
         * Espiral.
         */
        const spiral =
            angle +
            distance * 0.012;


        const randomX =
            (Math.random() - 0.5) *
            120;


        const randomY =
            (Math.random() - 0.5) *
            90;


        const x =
            Math.cos(spiral) *
            distance +
            randomX;


        const y =
            Math.sin(spiral) *
            distance *
            0.52 +
            randomY;


        /*
         * Tamaño.
         */
        const size =
            1.5 +
            Math.random() * 5;


        const brightness =
            0.35 +
            Math.random() * 0.85;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.left =
            `calc(50% + ${x}px)`;


        particle.style.top =
            `calc(50% + ${y}px)`;


        particle.style.opacity =
            brightness;


        /*
         * IMPORTANTE:
         * sin animación.
         */
        particle.style.animation =
            "none";


        galaxyParticles.appendChild(
            particle
        );

    }

}


createGalaxy();


/* =========================================================
   GIRASOLES PEQUEÑOS
========================================================= */

function createGalaxyFlowers() {

    /*
     * Muchos girasoles pequeños.
     */
    const totalFlowers =
        180;


    for (
        let i = 0;
        i < totalFlowers;
        i++
    ) {

        const flower =
            document.createElement("div");


        flower.classList.add(
            "galaxy-flower"
        );


        /*
         * Área grande.
         */
        const distance =
            80 +
            Math.random() * 620;


        const angle =
            Math.random() *
            Math.PI *
            2;


        /*
         * Espiral.
         */
        const spiral =
            angle +
            distance * 0.014;


        const spread =
            (Math.random() - 0.5) *
            100;


        const x =
            Math.cos(spiral) *
            distance +
            spread;


        const y =
            Math.sin(spiral) *
            distance *
            0.52 +
            (Math.random() - 0.5) *
            80;


        /*
         * Tamaño.
         */
        const size =
            10 +
            Math.random() * 14;


        flower.innerHTML =
            "🌻";


        flower.style.left =
            `calc(50% + ${x}px)`;


        flower.style.top =
            `calc(50% + ${y}px)`;


        flower.style.fontSize =
            `${size}px`;


        /*
         * Sin movimiento.
         */
        flower.style.animation =
            "none";


        flower.style.transform =
            `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;


        galaxyFlowerField.appendChild(
            flower
        );

    }

}


createGalaxyFlowers();


/* =========================================================
   PÉTALOS ESTÁTICOS
========================================================= */

function createPetals() {

    const totalPetals =
        45;


    for (
        let i = 0;
        i < totalPetals;
        i++
    ) {

        const petal =
            document.createElement("div");


        petal.classList.add(
            "petal"
        );


        const startX =
            Math.random() * 100;


        const startY =
            10 +
            Math.random() * 80;


        const size =
            5 +
            Math.random() * 16;


        petal.style.left =
            `${startX}%`;


        petal.style.top =
            `${startY}%`;


        petal.style.width =
            `${size}px`;


        petal.style.height =
            `${size * 1.5}px`;


        /*
         * Posición y rotación aleatoria,
         * pero completamente estática.
         */
        petal.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        petal.style.animation =
            "none";


        petalsContainer.appendChild(
            petal
        );

    }

}


createPetals();


/* =========================================================
   BOTÓN FINAL
========================================================= */

finalButton.addEventListener(
    "click",
    () => {

        finalContainer.classList.remove(
            "active"
        );


        setTimeout(
            () => {

                loveContainer.classList.add(
                    "active"
                );

            },
            500
        );

    }
);

