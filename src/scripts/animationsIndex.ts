import { initPlugins, init_gsap_context } from "./initPlugins";


export function loadAnimationsIndex() {
    initPlugins
    const gsap_ctx = init_gsap_context();

    gsap_ctx?.add(() => {

        // Animaciones
        const master_tl = gsap.timeline({ paused: true });
        const hero_tl = gsap.timeline();

        window.addEventListener("intro-video-ended", () => {
            master_tl.play();
        });
        // Hero Animations
        hero_tl.fromTo("#vertical_line", {
            height: "0%",
        }, {
            height: "100%",
            duration: 1,
            ease: "power2.inOut",
        }),

            hero_tl.fromTo(
                "#horizontal_lines .horizontal_line",
                { width: "0%" },
                {
                    width: "100%",
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.inOut",
                }
            );

        hero_tl.fromTo(
            ".clave-svg-path",
            { strokeDashoffset: gsap.getProperty(".clave-svg-path", "strokeDasharray") },
            {
                strokeDashoffset: 0,
                duration: 4,
                ease: "power2.inOut",
            },
            ">"
        );

        hero_tl.fromTo(
            ".title-text path",
            { strokeDashoffset: gsap.getProperty(".title-text path", "strokeDasharray") },
            {
                strokeDashoffset: 0,
                duration: 3,
                stagger: 0.2,
                ease: "power2.inOut",
            }, "<"
        );

        // Luz
        hero_tl.fromTo(
            "#light-beam",
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            },
            "<"
        )

        hero_tl.fromTo(
            ".clave-svg-path, .title-text path",
            { fill: "transparent" },
            {
                fill: "white",
                duration: 2,
                ease: "power2.inOut",
            },
            ">"
        );

        hero_tl.fromTo(
            "#arrow_down_hero",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            }
            , ">-1"
        );

        hero_tl.to("#arrow_down_hero", {
            y: 15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1,
        });

        hero_tl.to("#hero", {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom center",
                scrub: true,
            },
        });
        master_tl.add(hero_tl);

        // About Me Animations

        master_tl.fromTo("#piano_vertical_3d", {
            visibility: "hidden",
        }, {
            visibility: "visible",
            scrollTrigger: {
                trigger: "#about_me_section",
                start: "top bottom",
                end: "top center",
                scrub: true,
            },
        });

        const about_me_tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about_me",
                start: "top top",
                end: "+=1000%",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        })

        about_me_tl.fromTo(
            "#piano_vertical_3d", {
            x: "-300%",
        },
            {
                x: "-50%",
                ease: "circ.inOut",
                duration: 1,
            })
            .fromTo(
                "#abme_text_container > h2:nth-child(1)",
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                }, ">"
            )
            .to("#abme_text_container > h2:nth-child(1)", {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power2.in",
            }, ">1")
            .fromTo(
                "#piano_vertical_3d",
                {
                    x: "-50%"
                },
                {
                    x: "450%",
                    duration: 2,
                    ease: "circ.inOut",
                })
            .fromTo(
                "#abme_text_container > h2:nth-child(2)",
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.inOut",
                }, ">"
            )
            .to("#abme_text_container > h2:nth-child(2)", {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power2.in",
            }, ">1")
            .fromTo(
                "#piano_vertical_3d",
                {
                    x: "450%",
                },
                {
                    x: "-50%",
                    ease: "circ.inOut",
                    duration: 2,
                })
            .fromTo(
                "#abme_text_container > h2:nth-child(3)",
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.inOut",
                }, ">"
            )
            .to("#abme_text_container > h2:nth-child(3)", {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power2.in",
            }, ">1")
            .fromTo(
                "#piano_vertical_3d",
                {
                    x: "-50%",
                },
                {
                    x: "200%",
                    ease: "circ.inOut",
                    duration: 2,
                })
            .to("#svg-wrapper",
                {
                    scale: 10,
                    ease: "circ.inOut",
                    duration: 1,
                }, ">")
            .to("#svg-wrapper", {
                opacity: 0,
                zIndex: -1,
                ease: "circ.inOut",
                duration: 1,
            }, "<1")
            .to(
                ".about_me, #body",
                {
                    backgroundColor: "#161616",
                    ease: "none",
                    duration: 0.1,
                }, "<"
            ).to("#piano_vertical_3d", {
                opacity: 0,
                display: "none",
                ease: "none",
                duration: 0.1,
            }, ">1");


        master_tl.add(about_me_tl, ">");

        ////////////////////////////////////////////////////////////////////

        // Repository Animations

        const rep_tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#repertory_section",
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });


        rep_tl.fromTo("#repertory_text",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                ease: "circ.inOut",
            })
            .fromTo(".piano_silhouette", {
                opacity: 0,
            }, {
                opacity: 1,
                ease: "circ.inOut",
            }, "<")
            .fromTo(".piano_silhouette, #repertory_text",
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    ease: "circ.inOut",
                });

        master_tl.add(rep_tl, ">");

        // Animations Next Songs

        const next_songs_tl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: "#next_songs_section",
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            }
        );

        next_songs_tl
            .fromTo("#ns-intro-text", {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.1,
                ease: "power2.inOut",
            })
            .to(".bg-rect:nth-of-type(2n)", {
                x: "0%",
                ease: "circ.inOut",
            }, ">1")
            .to(".bg-rect:nth-of-type(2n+1)", {
                x: "0%",
                ease: "circ.inOut",
            }, "<")
            .fromTo('.bg-rect', {
                opacity: 1,
            },
                {
                    opacity: 0,
                    ease: "circ.inOut",
                }, ">0.2").fromTo("#songs_player", {
                    opacity: 0,
                    pointerEvents: "none",
                }, {
                    opacity: 1,
                    pointerEvents: "auto",
                    duration: 0.1,
                    ease: "power2.inOut",
                }, "<-0.2");
        master_tl.add(next_songs_tl, ">");
    });
}