const eyes = document.querySelectorAll(".eye");
const eyePupils = document.querySelectorAll(".eye__pupil");
const highLights = document.querySelectorAll(".eye__highlight");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");



// Positions indépendantes pour chaque œil
const eyeStates = [];

eyes.forEach((eye, index) => {
    eyeStates.push({
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0
    });
});

// Récupération de la position du curseur
document.addEventListener("pointermove", (event) => {
    if (reduceMotion.matches) {
    return;
}

    eyes.forEach((eye, index) => {
        const eyeRect = eye.getBoundingClientRect();

        const centerX = eyeRect.width / 2 + eyeRect.left;
        const centerY = eyeRect.top + eyeRect.height / 2;

        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;

        const limitedX = Math.max(-10, Math.min(deltaX, 10));
        const limitedY = Math.max(-20, Math.min(deltaY, 20));

        eyeStates[index].targetX = limitedX;
        eyeStates[index].targetY = limitedY;
    });

});

// Animation fluide des deux yeux
function animateEyes() {

    eyes.forEach((eye, index) => {
        const state = eyeStates[index];

        if (reduceMotion.matches) {
            state.currentX = 0;
            state.currentY = 0;
            state.targetX = 0;
            state.targetY = 0;
}

        state.currentX += (state.targetX - state.currentX) * 0.15;
        state.currentY += (state.targetY - state.currentY) * 0.15;

        eyePupils[index].style.transform =
            `translate(${state.currentX}px, ${state.currentY}px)`;

        highLights[index].style.transform =
            `translate(${state.currentX * 3}px, ${state.currentY * 3}px)`;
    });

    requestAnimationFrame(animateEyes);
}

requestAnimationFrame(animateEyes);


const footer = document.querySelector("footer");
const footerFire = document.querySelector(".footer__fire");

let centerX = 0;
let centerY = 0;

let fireCurrentX = 0;
let fireCurrentY = 0;

let fireTargetX = 0;
let fireTargetY = 0;

footer.addEventListener("pointerenter", () => {
    const fireRect = footerFire.getBoundingClientRect();

    centerX = fireRect.left + fireRect.width / 2;
    centerY = fireRect.top + fireRect.height / 2;
});

footer.addEventListener("pointermove", (event) => {
    if (reduceMotion.matches) {
    return;
}

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const moveX = deltaX * 0.5;
    const moveY = deltaY * 0.5;

    const distance = Math.hypot(moveX, moveY);
    const maxDistance = 300;

    const ratio = distance > maxDistance
    ? maxDistance / distance
    : 1;

const limitedX = moveX * ratio;
const limitedY = moveY * ratio;

    fireTargetX = limitedX;
    fireTargetY = limitedY;

});

footer.addEventListener("pointerleave", () => {
    fireTargetX = 0;
    fireTargetY = 0;
});


function animateFire() {
    if (reduceMotion.matches) {
    fireCurrentX = 0;
    fireCurrentY = 0;
    fireTargetX = 0;
    fireTargetY = 0;
}

    fireCurrentX +=(fireTargetX - fireCurrentX) * 0.15;
    fireCurrentY +=(fireTargetY - fireCurrentY) * 0.15;

    footerFire.style.transform =
    `translate(${fireCurrentX}px, ${fireCurrentY}px)`;

    requestAnimationFrame(animateFire);
}

requestAnimationFrame(animateFire);

