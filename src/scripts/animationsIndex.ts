import { init_gsap_context } from "./gsap_init";


export function loadAnimationsIndex() {
    const gsap_ctx = init_gsap_context();

    gsap_ctx?.add(() => {

        // Animaciones
        const master_tl = gsap.timeline({ paused: true });
        const hero_tl = gsap.timeline();
        const about_me_tl = gsap.timeline();
        const rep_tl = gsap.timeline();

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
        let about_me_text: HTMLElement[] = gsap.utils.toArray("#abme_text_container .text_right_about_me");



        about_me_text.forEach((text, i) => {
            about_me_tl.fromTo(
                text,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: true,
                    },
                    onComplete: () => {
                        gsap.to(text, {
                            opacity: 0,
                            duration: 3,
                            ease: "power2.in",
                            scrollTrigger: {
                                trigger: text,
                                start: "bottom 75%",
                                end: "bottom 25%",
                                scrub: true,
                            },
                        });
                    },
                }, ">"
            );
        });

        ScrollTrigger.create({
            trigger: ".abme_text_container",
            pin: true,
        })
        about_me_tl.fromTo("#piano_vertical_3d", {
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

        about_me_tl.to(
            "#piano_vertical_3d",
            {
                x: "-50%",
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#about_me_section",
                    start: "top bottom",
                    endTrigger: "#abme_text_container",
                    end: "top center",
                    scrub: true,
                },
            });
        about_me_tl.fromTo(
            "#piano_vertical_3d",
            {
                x: "-50%"
            },
            {
                x: "450%",
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#abme_text_container",
                    start: "20% center",
                    end: "25% top",
                    scrub: true,
                },
            });
        about_me_tl.fromTo(
            "#piano_vertical_3d",
            {
                x: "450%",
            },
            {
                x: "-50%",
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#abme_text_container",
                    start: "60% center",
                    end: "65% top",
                    scrub: true,
                },
            });
        about_me_tl.fromTo(
            "#piano_vertical_3d",
            {
                x: "-50%",
            },
            {
                x: "200%",
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#abme_text_container",
                    start: "100% center",
                    end: "105% top",
                    scrub: true,
                },
            });
        about_me_tl.to("#svg-wrapper",
            {
                scale: 100,
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#abme_text_container",
                    start: "120% center",
                    end: "125% top",
                    scrub: true,
                },
            });
        about_me_tl.to("#svg-wrapper", {
            opacity: 0,
            zIndex: -1,
            ease: "circ.inOut",
            scrollTrigger: {
                trigger: ".repertory",
                start: "center 90%",
                end: "bottom 80%",
                scrub: true,
            }
        })
            .to(
                "#repertory_section, #body",
                {
                    backgroundColor: "#161616",
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#repertory_section",
                        start: "top center",
                        end: "65% bottom",
                        scrub: true,
                    },
                }
            );
        master_tl.add(about_me_tl, ">-1");

        // Repository Animations

        rep_tl.fromTo("#repertory_text",
            {
                x: 1300,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#repertory_text",
                    start: "10% 30%",
                    end: "center top",
                    scrub: true,
                },
            })



        rep_tl.fromTo("#piano_with_hands", {
            scale: 0.1,
            translateX: "-80%",
            opacity: 0,
        }, {
            scale: 0.6,
            translateX: "-15%",
            translateY: "-5%",
            opacity: 1,
            ease: "circ.inOut",
            scrollTrigger: {
                trigger: "#repertory_text",
                start: "10% 30%",
                end: "center top",
                scrub: true,
            },
        });

        rep_tl.to("#repertory_text",
            {
                scrollTrigger: {
                    trigger: ".text_right",
                    start: "top 10%",
                    end: "bottom+=1500 85%",
                    scrub: true,
                    pin: "#repertory_text, .repertory",
                    pinSpacing: true,
                },
            })

        rep_tl.fromTo("#piano_with_hands, #repertory_text",
            {
                opacity: 1,
            },
            {
                opacity: 0,
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: "#repertory_section",
                    start: "83% bottom",
                    end: "90% center",
                    scrub: true,
                },
            });

        master_tl.add(rep_tl, ">-1");

        // Animations Next Songs

        const next_songs_tl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: "#next_songs_container",
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1,
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