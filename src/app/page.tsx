"use client";

import Image from "next/image";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useInView } from "react-intersection-observer";
import { use, useEffect, useState } from "react";
import Header from "./header";
import { useSpring, animated } from "@react-spring/web";
import { link } from "fs";

export default function Home() {
  const { ref: experience, inView: experienceView } = useInView({
    threshold: 0.5,
  });
  const { ref: project, inView: projectView } = useInView({
    threshold: 0.5,
  });

  const { ref: projectTitle, inView: projectTitleView } = useInView({
    threshold: 0.5,
  });

  const { ref: footer, inView: footerView } = useInView({
    threshold: 0.5,
  });

  const { ref: testimonials, inView: testimonialsView } = useInView({
    threshold: 0.5,
  });
  
  const [aboutLineWidth, setAboutLineWidth] = useState(50);
  const [experienceLineWidth, setExperienceLineWidth] = useState(50);
  const [projectLineWidth, setProjectLineWidth] = useState(50);
  const [linkHovered, setLinkHovered] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isSlideHovered, setIsSlideHovered] = useState(false);

  const projects = [
    {
      name: "Event Tabulation System",
      description:
        "A web application that allows users to create and manage events and tabulate results.",
      stacks: ["Flutter", "Node.js", "MongoDB", "Firebase"],
      image: "/tablu.png",
      link: "https://play.google.com/store/apps/details?id=com.tab.lu",
    },
    {
      name: "Online Phone Store",
      description:
        "A web application that mimics an online phone store where users can view and purchase phones.",
      stacks: ["PHP", "HTML", "CSS", "JavaScript"],
      image: "/phone.png",
      link: "http://rjlordering.great-site.net/",
    },
    {
      name: "Motivational App",
      description:
        "An android application that generates motivational quotes and personality tests also involves leveling and achievements",
      stacks: ["ReactNative", "Node.js", "Firebase"],
      image: "/inspiro.png",
      link: "https://drive.google.com/file/d/10DYMCgrhAPCk-XBt6E0vsH_OrOF1Og7L/view",
    },
    {
      name: "Libary Management System",
      description:
        "A web application that allows users to borrow and return books from a library. Default email:admin@gmail.com password: admin1234",
      stacks: ["React", "Node.js", "Firebase"],
      image: "/library.png",
      link: "https://react-js-ralph-libary.vercel.app",
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isSlideHovered) {
      // console.log("Starting timer");
      timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % projects.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => clearInterval(timer); // Clean up on component unmount
  }, [isSlideHovered, projects.length]);

  const headerProps = useSpring({
    opacity: projectView || projectTitleView || footerView || testimonialsView ? 0 : 1,
    transform:
      projectView || projectTitleView || footerView
        ? "translateX(-50px)"
        : "translateX(0)",
    config: { duration: 300 },
  });

  const handleMouseEnter = () => {
    setLinkHovered(true);
  };

  const handleMouseLeave = () => {
    setLinkHovered(false);
  };
  const handleRightArrowClick = () => {
    setCurrentSlide((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
  };

  const handleLeftArrowClick = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        // console.log("At the top of the page");
        setExperienceLineWidth(50);
        setAboutLineWidth(60);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (experienceView) {
      // console.log("In experience view");
      setAboutLineWidth(50);
      setProjectLineWidth(50);
      setExperienceLineWidth(60);
    }
  }, [experienceView]);

  useEffect(() => {
    if (projectView) {
      // console.log("In project view");
      setExperienceLineWidth(50);
      setProjectLineWidth(60);
    }
  }, [projectView]);

  useEffect(() => {
    if (projectTitleView) {
      // console.log("In project title view");
      setExperienceLineWidth(50);
      setProjectLineWidth(60);
    }
  }, [projectTitleView]);

  useEffect(() => {
    if (testimonialsView) {
      console.log("In testimonials view");
      setExperienceLineWidth(50);
      setProjectLineWidth(50);
    }
  }, [testimonialsView]);
  useEffect(() => {
    if (footerView) {
      // console.log("In footer view");
      setExperienceLineWidth(50);
      setProjectLineWidth(50);
    }
  }, [footerView]);



  useEffect(() => {
    if (projectView || projectTitleView || footerView || testimonialsView) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000); // Set delay here. 1000ms = 1s

      return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the delay
    } else {
      setShouldRender(true);
    }
  }, [projectView, projectTitleView, footerView, testimonialsView]);

  return (
    <>
      <div className="row">
        <div className={`col-md-6 ${styles.headings}`}>
          {shouldRender && (
            <Header>
              <animated.header style={headerProps} className={styles.header}>
         <a href="mailto:loquellanoralphjenrey@gmail.com">
  <button className={`btn btn-outline-primary my-3 ${styles.contactMe}`}>
    Contact Me
    <i className="fa fa-send" style={{ marginLeft: '10px' }}></i>
  </button>
</a>
                <div className={`text-white ${styles.name}`}>
                  Ralph Jenrey Loquellano
                </div>
                <div className={`text-white ${styles.jobName}`}>
                  Full Stack Developer
                </div>
                <div className="text-white">
                  I build full stack web applications from frontend to backend
                  that meet user needs and specifications
                </div>
                <div>
                  <ul className={styles.links}>
                    <li
                      className={styles.list}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className={styles.linkLine}
                        style={{
                          width: linkHovered ? "60px" : `${aboutLineWidth}px`,
                        }}
                      ></div>
                      <a className={styles.linkText}>ABOUT</a>
                    </li>
                    <li
                      className={styles.list}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className={styles.linkLine}
                        style={{
                          width: linkHovered
                            ? "60px"
                            : `${experienceLineWidth}px`,
                        }}
                      ></div>
                      <a className={styles.linkText}>EXPERIENCE</a>
                    </li>

                    <li
                      className={styles.list}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className={styles.linkLine}
                        style={{
                          width: linkHovered ? "60px" : `${projectLineWidth}px`,
                        }}
                      ></div>
                      <a className={styles.linkText}>PROJECT</a>
                    </li>
                  </ul>

                  <div className={styles.socialIcons}>
                    <svg
                      onClick={() =>
                        window.open("https://github.com/ralphjenrey")
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="social-icons"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    <svg
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/in/ralph-jenrey-loquellano-78a169256/"
                        )
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </div>
                </div>
              </animated.header>
            </Header>
          )}
        </div>

        <div className="col-md-6">
          <section className={`text-white}`} style={{ wordSpacing: "5px" }}>
            <p className={`${styles.about} fs-6`}>
              I never would have guessed that I would get this far. I almost
              gave up on becoming a web developer when I was a freshman in
              college because it&apos;s so difficult. It dawns on me then that in all
              the year I spent working in
              <span className={styles.highlight}>
                {" "}
                customer service
              </span> and{" "}
              <span className={styles.highlight}> technical support</span>, I
              had never encountered the kind of difficulty presented by the IT
              sector. I was forced to quit from a work in the BPO sector as I
              knew it was not for me. As a freshman and junior, I studied web
              development on my own. until I was hired on as a <span className={styles.highlight}> Full Stack
              Developer</span> freelancer by a startup business. I gain more knowledge
              and expertise from working on actual tasks. primarily on
              strengthening application security through speed optimization.
              <br></br>
              <br></br>
              I&apos;m a <span className={styles.highlight}> fourth-year</span> student and entering senior right now. Most of
              the time, I like learning while also helping my friends and
              classmates comprehend programming ideas. Right now, I&apos;m trying to
              find <span className={styles.highlight}> 600 hours of on-the-job training</span>. As I adjust and
              participate, I am excited to be a part of and learn from your
              organization. I spend my leisure time with my daughter and my
              wife. Typically visit a mall. We see movies together occasionally.
            </p>
          </section>

          <section style={{ marginTop: "120px", gap: 100 }} ref={experience}>
            <div className={`row mb-5 ${styles.experience}`}>
              <div className="col-lg-6 col-md-4 col-sm-4">
                <header className={styles.date}>December 2023 - Present</header>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-8">
                <h6 className={styles.jobPosition}>
                  FluxFusionDev - Full Stack Developer
                </h6>
                <br></br>
                <ul className={styles.jobDescription}>
                  <li>
                    Developed Android mobile applications using Flutter,
                    ensuring a seamless user experience on both Android
                    platforms.
                  </li>
                  <li>
                    Integrated Firebase services, such as Authentication,
                    Realtime Database, Cloud Firestore, and Cloud Storage.
                  </li>
                  <li>
                    Established communication between mobile applications and
                    backend servers through RESTful APIs.
                  </li>
                  <li>
                    Designed a multi-level marketing structure for a marketing
                    scheme application.
                  </li>
                  <li>
                    Designed and implemented MongoDB databases to store and
                    manage application data.
                  </li>
                  <li>
                    Developed a React Native application for personality and
                    quotes generator.
                  </li>
                </ul>
              </div>
              <div></div>
            </div>

            <div className={`row mb-5 ${styles.experience}`}>
              <div className="col-md-6">
                <header className={styles.date}>
                  June 2022 - December 2022
                </header>
              </div>
              <div className="col-md-6">
                <h6 className={styles.jobPosition}>
                  Tech Mahindra - Technical Support
                </h6>
                <br></br>

                <ul className={styles.jobDescription}>
                  <li>
                    Assisted customers in resolving a wide array of technical
                    issues.
                  </li>
                  <li>
                    Provided technical guidance to optimize operational
                    processes.
                  </li>
                  <li>
                    Diagnosed software and hardware problems and guided
                    customers through solutions.
                  </li>
                </ul>
              </div>
              <div></div>
            </div>

            <div className={`row mb-5 ${styles.experience}`}>
              <div className="col-lg-6 col-md-4 col-sm-4">
                <header className={styles.date}>
                  September 2021 - February 2022
                </header>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-8">
                <h6 className={styles.jobPosition}>
                  Concentrix - Customer Service Representative
                </h6>
                <br></br>
                <ul className={styles.jobDescription}>
                  <li>Assisted customer in moving internet service</li>
                  <li>Troubleshoot cable TV</li>
                  <li>Pitch sales to customer</li>
                </ul>
              </div>
              <div></div>
            </div>
          </section>

          <div style={{ margin: 40 }}>
            <h4 className="text-center text-white opacity-50">Languages</h4>
            <div
              style={{
                margin: "40px 0",
                display: "flex",
                gap: 50,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div className={`${styles.languages}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 256 256"
                  preserveAspectRatio="xMinYMin meet"
                >
                  <path fill="#F26522" d="M0 0h256v256H0z" />
                  <path
                    d="M105.536 159.959h39.157v-10.653h-27.064v-16.507h24.953v-10.653h-24.953v-15.452h27.064V96.041h-39.157v63.918zm91.462-17.371c0-12.765-.864-15.548-18.043-19.675-11.037-2.687-11.229-2.879-11.229-10.173 0-5.566 1.44-7.294 9.598-7.294 5.566 0 11.804.768 17.083 1.92l1.344-10.173c-6.335-1.44-13.053-2.112-18.62-2.112-16.219 0-21.497 5.759-21.497 17.371 0 13.533 2.111 16.508 17.563 19.963 11.517 2.495 11.709 3.07 11.709 10.173 0 6.142-1.44 7.966-10.174 7.966-6.334 0-12.092-1.152-18.042-2.976l-2.112 9.502c4.223 2.015 12.669 3.839 19.963 3.839 18.906 0 22.457-6.239 22.457-18.331zm22.266-23.801c0-9.79 4.703-11.71 16.027-11.71 2.016 0 6.239.289 9.022.865l.768-9.79c-2.88-.671-7.486-1.151-11.037-1.151-17.467 0-26.489 5.374-26.489 22.265v23.322c0 11.037 3.263 18.33 19.77 18.33 15.068 0 19.675-7.485 19.675-17.466v-4.607c0-11.037-4.703-15.836-16.315-15.836-4.127 0-8.062.576-11.421 1.728v-5.95zm9.597 14.3c4.223 0 6.43 1.44 6.43 6.046v4.703c0 4.894-1.92 7.006-7.965 7.006-6.047 0-8.062-1.728-8.062-7.006v-8.734c2.687-1.152 6.142-2.015 9.597-2.015z"
                    fill="#FFF"
                  />
                </svg>
              </div>
              <div className={`${styles.languages}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  preserveAspectRatio="xMinYMin meet"
                  viewBox="0 0 256 256"
                  id="javascript"
                >
                  <path fill="#F7DF1E" d="M0 0h256v256H0V0z" />
                  <path
                    fill="white"
                    d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"
                  />
                </svg>{" "}
              </div>

              <div className={`${styles.languages}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 192.756 192.756"
                  id="php"
                >
                  <defs>
                    <path
                      id="a"
                      d="M96.378 141.648c47.528 0 86.06-20.27 86.06-45.271s-38.531-45.271-86.06-45.271-86.06 20.269-86.06 45.271c0 25.002 38.532 45.271 86.06 45.271z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use overflow="visible" />
                  </clipPath>
                  <g clip-path="url(#b)">
                    <defs>
                      <path id="c" d="M10.318 51.107h172.119v90.541H10.318z" />
                    </defs>
                    <clipPath id="d">
                      <use overflow="visible" />
                    </clipPath>
                  </g>
                  <g clip-path="url(#b)">
                    <defs>
                      <path id="e" d="M10.318 51.107h172.119v90.541H10.318z" />
                    </defs>
                    <clipPath id="f">
                      <use overflow="visible" />
                    </clipPath>
                  </g>
                  <path
                    fill="#6e81b6"
                    fill-rule="evenodd"
                    d="M96.378 138.287c45.673 0 82.698-18.764 82.698-41.909s-37.025-41.909-82.698-41.909c-45.672 0-82.698 18.764-82.698 41.909s37.026 41.909 82.698 41.909z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M113.131 109.924l4.102-21.112c.926-4.765.156-8.319-2.287-10.565-2.367-2.173-6.385-3.23-12.283-3.23h-7.104l2.032-10.46a1.344 1.344 0 0 0-1.319-1.602h-9.805c-.644 0-1.197.457-1.32 1.089L80.79 86.457c-.396-2.522-1.372-4.69-2.934-6.479-2.876-3.292-7.425-4.961-13.522-4.961H45.33c-.644 0-1.197.457-1.32 1.088l-8.817 45.368c-.077.395.026.801.282 1.111.255.311.635.49 1.038.49h9.882c.644 0 1.197-.457 1.32-1.09l2.133-10.973h7.356c3.86 0 7.104-.418 9.636-1.242 2.589-.842 4.972-2.27 7.072-4.236 1.697-1.559 3.099-3.305 4.178-5.188l-1.761 9.064c-.077.395.026.803.282 1.111.255.311.636.49 1.038.49h9.805c.644 0 1.197-.457 1.32-1.088l4.839-24.903h6.728c2.867 0 3.707.571 3.936.816.207.224.637 1.013.154 3.5l-3.9 20.073a1.347 1.347 0 0 0 1.32 1.601h9.961a1.341 1.341 0 0 0 1.319-1.085zM67.673 92.48c-.616 3.165-1.776 5.422-3.45 6.709-1.7 1.311-4.419 1.975-8.082 1.975h-4.38l3.167-16.298h5.663c4.16 0 5.836.889 6.509 1.634.933 1.034 1.131 3.103.573 5.98zM154.432 79.978c-2.875-3.292-7.424-4.961-13.521-4.961h-19.004c-.645 0-1.197.457-1.32 1.088l-8.816 45.368c-.078.395.025.801.281 1.111s.637.49 1.037.49h9.883c.645 0 1.197-.457 1.32-1.09l2.133-10.973h7.357c3.861 0 7.102-.418 9.635-1.242 2.59-.842 4.973-2.27 7.072-4.236 1.752-1.609 3.193-3.418 4.285-5.371s1.875-4.131 2.332-6.475c1.123-5.781.224-10.393-2.674-13.709zm-9.621 12.502c-.617 3.165-1.777 5.422-3.449 6.709-1.701 1.311-4.42 1.975-8.082 1.975h-4.381l3.166-16.298h5.664c4.16 0 5.836.889 6.51 1.634.931 1.034 1.13 3.103.572 5.98z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M60.591 83.521c3.754 0 6.257.693 7.508 2.079 1.25 1.386 1.548 3.766.894 7.137-.684 3.511-2 6.017-3.95 7.519s-4.918 2.252-8.902 2.252h-6.012l3.69-18.987h6.772zm-24.079 38.208h9.882l2.345-12.061h8.465c3.735 0 6.808-.393 9.22-1.178s4.605-2.1 6.578-3.947c1.656-1.521 2.996-3.201 4.022-5.037 1.025-1.836 1.753-3.861 2.184-6.076 1.046-5.378.257-9.567-2.365-12.567-2.621-3.001-6.792-4.501-12.509-4.501H45.33l-8.818 45.367zM86.466 64.3h9.805l-2.344 12.062h8.736c5.494 0 9.287.958 11.373 2.875 2.086 1.917 2.711 5.024 1.877 9.319l-4.102 21.112h-9.961l3.9-20.074c.443-2.284.281-3.841-.49-4.672-.771-.83-2.412-1.246-4.92-1.246h-7.836l-5.051 25.992h-9.805L86.466 64.3zM137.729 83.521c3.754 0 6.256.693 7.508 2.079 1.25 1.386 1.547 3.766.893 7.137-.682 3.511-1.998 6.017-3.949 7.519-1.949 1.502-4.918 2.252-8.9 2.252h-6.012l3.689-18.987h6.771zm-24.081 38.208h9.883l2.344-12.061h8.465c3.736 0 6.809-.393 9.221-1.178s4.605-2.1 6.578-3.947c1.656-1.521 2.996-3.201 4.021-5.037s1.754-3.861 2.186-6.076c1.045-5.378.256-9.567-2.365-12.567-2.623-3.001-6.793-4.501-12.51-4.501h-19.004l-8.819 45.367z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <section style={{ textAlign: "center" }}>
            <div style={{ margin: 40 }}>
              <h4 className="text-center text-white opacity-50">Framework</h4>
              <div
                style={{
                  margin: "40px 0",
                  display: "flex",
                  gap: 50,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <div className={`${styles.languages}`}>
                  <svg
                    width="75"
                    height={75}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#53C1DE"
                    viewBox="0 0 24 24"
                    id="react"
                  >
                    <circle cx="12" cy="11.999" r="2.147" fill="#53C1DE" />
                    <path
                      fill="#53C1DE"
                      d="M4.514 15.801c.211.07.422.141.638.202-.07.281-.131.558-.188.844-.492 2.602-.108 4.664 1.12 5.372 1.266.731 3.394-.019 5.466-1.833.164-.145.328-.295.492-.455.206.202.422.394.637.581 2.006 1.725 3.989 2.423 5.213 1.716 1.266-.731 1.678-2.948 1.144-5.648a18.477 18.477 0 0 0-.141-.633c.15-.042.295-.089.441-.136 2.705-.895 4.664-2.344 4.664-3.83 0-1.42-1.847-2.798-4.397-3.675v-.001a24.589 24.589 0 0 0-.759-.239c.042-.173.08-.347.117-.52.577-2.794.197-5.038-1.083-5.779-1.233-.708-3.244.028-5.278 1.8-.202.173-.398.356-.586.539a14.702 14.702 0 0 0-.389-.361C9.492 1.851 7.355 1.054 6.075 1.8c-1.228.713-1.594 2.827-1.078 5.469.052.263.108.52.173.783-.3.084-.595.178-.872.277C1.795 9.196 0 10.565 0 11.981c0 1.463 1.912 2.929 4.514 3.82zm6.375 3.819a8.585 8.585 0 0 1-2.644 1.655c-.52.248-1.12.272-1.655.061-.745-.431-1.055-2.086-.633-4.313.052-.262.108-.525.173-.783 1.05.225 2.109.38 3.183.459a24.606 24.606 0 0 0 2.025 2.503c-.15.145-.3.286-.45.417l.001.001zm5.953-8.802a36.56 36.56 0 0 0-.68-1.228c-.23-.398-.469-.792-.717-1.181.755.094 1.477.22 2.152.375a20.737 20.737 0 0 1-.755 2.034zm.009 2.334c.3.68.563 1.369.792 2.077-.727.164-1.462.291-2.203.375a32.717 32.717 0 0 0 1.411-2.452zm-.542-1.166a31.495 31.495 0 0 1-2.146 3.74c-.698.052-1.425.075-2.161.075s-1.448-.023-2.137-.066a28.48 28.48 0 0 1-2.161-3.731h-.002a28.24 28.24 0 0 1 2.147-3.726 29.151 29.151 0 0 1 4.304 0c.398.591.778 1.195 1.139 1.814a32.18 32.18 0 0 1 1.017 1.894zM7.832 9.599c-.23.398-.455.805-.666 1.218a22.302 22.302 0 0 1-.75-2.043c.675-.15 1.392-.272 2.137-.366-.247.389-.491.787-.721 1.191zm-.665 3.59c.216.413.436.821.67 1.224.239.408.483.816.741 1.214a21.23 21.23 0 0 1-2.175-.352c.206-.675.464-1.373.764-2.086zm4.871 5.291a21.873 21.873 0 0 1-1.42-1.701 32.91 32.91 0 0 0 2.808-.005 19.942 19.942 0 0 1-1.388 1.706zm6.127 1.408a2.086 2.086 0 0 1-.774 1.466c-.745.431-2.334-.131-4.05-1.603a20.163 20.163 0 0 1-.595-.539 23.21 23.21 0 0 0 1.978-2.512 23.126 23.126 0 0 0 3.197-.492c.047.192.089.384.127.572a8.54 8.54 0 0 1 .117 3.108zm.407-10.856c.244.07.478.145.703.22 2.184.75 3.717 1.866 3.717 2.719 0 .919-1.636 2.105-3.975 2.878-.131.042-.262.084-.398.122a23.84 23.84 0 0 0-1.195-2.991c.45-.956.83-1.941 1.148-2.948zM13.26 4.326c1.745-1.518 3.371-2.113 4.112-1.687.792.455 1.097 2.292.6 4.706a7.988 7.988 0 0 1-.108.469 24.1 24.1 0 0 0-3.155-.497 23.536 23.536 0 0 0-1.997-2.49c.183-.173.361-.337.548-.501zm-1.25 1.219c.492.534.956 1.096 1.387 1.677a30.883 30.883 0 0 0-2.789 0c.459-.604.933-1.166 1.402-1.677zM6.572 2.672c.788-.459 2.536.197 4.378 1.828.117.103.234.216.356.328a23.643 23.643 0 0 0-2.011 2.488 24.72 24.72 0 0 0-3.15.488c-.061-.239-.112-.483-.164-.727-.441-2.269-.15-3.979.591-4.405zM4.627 9.28c.267-.094.539-.178.811-.258a24.986 24.986 0 0 0 1.148 2.981c-.45.98-.839 1.992-1.162 3.023l-.001.001a11.205 11.205 0 0 1-.581-.183c-.998-.314-2.133-.811-2.953-1.462a2.103 2.103 0 0 1-.881-1.402c0-.858 1.481-1.955 3.619-2.7z"
                    />
                  </svg>
                </div>
                <div className={`${styles.languages}`}>
                  <svg
                    width="65"
                    height={65}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#53C1DE"
                    viewBox="0 0 24 24"
                    id="react"
                  >
                    <circle cx="12" cy="11.999" r="2.147" fill="#53C1DE" />
                    <path
                      fill="#53C1DE"
                      d="M4.514 15.801c.211.07.422.141.638.202-.07.281-.131.558-.188.844-.492 2.602-.108 4.664 1.12 5.372 1.266.731 3.394-.019 5.466-1.833.164-.145.328-.295.492-.455.206.202.422.394.637.581 2.006 1.725 3.989 2.423 5.213 1.716 1.266-.731 1.678-2.948 1.144-5.648a18.477 18.477 0 0 0-.141-.633c.15-.042.295-.089.441-.136 2.705-.895 4.664-2.344 4.664-3.83 0-1.42-1.847-2.798-4.397-3.675v-.001a24.589 24.589 0 0 0-.759-.239c.042-.173.08-.347.117-.52.577-2.794.197-5.038-1.083-5.779-1.233-.708-3.244.028-5.278 1.8-.202.173-.398.356-.586.539a14.702 14.702 0 0 0-.389-.361C9.492 1.851 7.355 1.054 6.075 1.8c-1.228.713-1.594 2.827-1.078 5.469.052.263.108.52.173.783-.3.084-.595.178-.872.277C1.795 9.196 0 10.565 0 11.981c0 1.463 1.912 2.929 4.514 3.82zm6.375 3.819a8.585 8.585 0 0 1-2.644 1.655c-.52.248-1.12.272-1.655.061-.745-.431-1.055-2.086-.633-4.313.052-.262.108-.525.173-.783 1.05.225 2.109.38 3.183.459a24.606 24.606 0 0 0 2.025 2.503c-.15.145-.3.286-.45.417l.001.001zm5.953-8.802a36.56 36.56 0 0 0-.68-1.228c-.23-.398-.469-.792-.717-1.181.755.094 1.477.22 2.152.375a20.737 20.737 0 0 1-.755 2.034zm.009 2.334c.3.68.563 1.369.792 2.077-.727.164-1.462.291-2.203.375a32.717 32.717 0 0 0 1.411-2.452zm-.542-1.166a31.495 31.495 0 0 1-2.146 3.74c-.698.052-1.425.075-2.161.075s-1.448-.023-2.137-.066a28.48 28.48 0 0 1-2.161-3.731h-.002a28.24 28.24 0 0 1 2.147-3.726 29.151 29.151 0 0 1 4.304 0c.398.591.778 1.195 1.139 1.814a32.18 32.18 0 0 1 1.017 1.894zM7.832 9.599c-.23.398-.455.805-.666 1.218a22.302 22.302 0 0 1-.75-2.043c.675-.15 1.392-.272 2.137-.366-.247.389-.491.787-.721 1.191zm-.665 3.59c.216.413.436.821.67 1.224.239.408.483.816.741 1.214a21.23 21.23 0 0 1-2.175-.352c.206-.675.464-1.373.764-2.086zm4.871 5.291a21.873 21.873 0 0 1-1.42-1.701 32.91 32.91 0 0 0 2.808-.005 19.942 19.942 0 0 1-1.388 1.706zm6.127 1.408a2.086 2.086 0 0 1-.774 1.466c-.745.431-2.334-.131-4.05-1.603a20.163 20.163 0 0 1-.595-.539 23.21 23.21 0 0 0 1.978-2.512 23.126 23.126 0 0 0 3.197-.492c.047.192.089.384.127.572a8.54 8.54 0 0 1 .117 3.108zm.407-10.856c.244.07.478.145.703.22 2.184.75 3.717 1.866 3.717 2.719 0 .919-1.636 2.105-3.975 2.878-.131.042-.262.084-.398.122a23.84 23.84 0 0 0-1.195-2.991c.45-.956.83-1.941 1.148-2.948zM13.26 4.326c1.745-1.518 3.371-2.113 4.112-1.687.792.455 1.097 2.292.6 4.706a7.988 7.988 0 0 1-.108.469 24.1 24.1 0 0 0-3.155-.497 23.536 23.536 0 0 0-1.997-2.49c.183-.173.361-.337.548-.501zm-1.25 1.219c.492.534.956 1.096 1.387 1.677a30.883 30.883 0 0 0-2.789 0c.459-.604.933-1.166 1.402-1.677zM6.572 2.672c.788-.459 2.536.197 4.378 1.828.117.103.234.216.356.328a23.643 23.643 0 0 0-2.011 2.488 24.72 24.72 0 0 0-3.15.488c-.061-.239-.112-.483-.164-.727-.441-2.269-.15-3.979.591-4.405zM4.627 9.28c.267-.094.539-.178.811-.258a24.986 24.986 0 0 0 1.148 2.981c-.45.98-.839 1.992-1.162 3.023l-.001.001a11.205 11.205 0 0 1-.581-.183c-.998-.314-2.133-.811-2.953-1.462a2.103 2.103 0 0 1-.881-1.402c0-.858 1.481-1.955 3.619-2.7z"
                    />
                  </svg>
                  <p className="text-white">React Native</p>
                </div>
                <div className={`${styles.languages}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={80}
                    width={80}
                    viewBox="0 0 128 128"
                    id="node-js"
                  >
                    <path
                      fill="#83CD29"
                      d="M112.771 30.334l-44.097-25.605c-2.781-1.584-6.402-1.584-9.205 0l-44.568 25.605c-2.87 1.651-4.901 4.754-4.901 8.073v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623c-.712 0-2.306 1.061-2.306 1.773v50.49c0 3.896-3.524 7.773-10.11 4.48l-12.167-7.013c-.424-.23-.723-.693-.723-1.181v-51.142c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754c1.417.82 3.027 1.246 4.647 1.246 1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083v-51.142c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
                    />
                  </svg>
                </div>
                <div className={`${styles.languages}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 24 24"
                    id="flutter"
                  >
                    <path
                      fill="#42A5F5"
                      fill-opacity=".8"
                      d="m6 15.695-3.696-3.696L14.305 0h7.391L6 15.695zm15.695-4.622h-7.391l-2.768 2.768 3.696 3.696 6.463-6.464z"
                    />
                    <path
                      fill="#0D47A1"
                      d="M11.536 21.232 14.305 24h7.391l-6.463-6.463-3.697 3.695z"
                    />
                    <path
                      fill="#42A5F5"
                      d="m7.849 17.539 3.69-3.691 3.69 3.69-3.69 3.691-3.69-3.69z"
                    />
                    <linearGradient
                      id="a"
                      x1="-2075.633"
                      x2="-2075.633"
                      y1="-1590.528"
                      y2="-1590.518"
                      gradientTransform="matrix(380.4042 -380.4175 53.104 53.1021 874056.25 -705127.375)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".2" stop-opacity=".15" />
                      <stop
                        offset=".85"
                        stop-color="#616161"
                        stop-opacity=".01"
                      />
                    </linearGradient>
                    <path
                      fill="url(#a)"
                      d="m11.539 21.229 3.69-3.69.515.515-3.69 3.69-.515-.515z"
                    />
                    <linearGradient
                      id="b"
                      x1="-2078.999"
                      x2="-2078.99"
                      y1="-1580.155"
                      y2="-1580.155"
                      gradientTransform="matrix(565.291 0 0 380.9571 1175251.25 601990.813)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".2" stop-opacity=".55" />
                      <stop
                        offset=".85"
                        stop-color="#616161"
                        stop-opacity=".01"
                      />
                    </linearGradient>
                    <path
                      fill="url(#b)"
                      d="m11.536 21.232 5.483-1.894-1.788-1.801-3.695 3.695z"
                    />
                  </svg>{" "}
                </div>
              </div>
            </div>

            <div style={{ margin: 40 }}>
              <h4 className="text-center text-white opacity-50">Databases</h4>
              <div
                style={{
                  margin: "40px 0",
                  display: "flex",
                  gap: 50,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div className={`${styles.languages}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={75}
                    height={75}
                    viewBox="0 0 24 24"
                    id="firebase"
                  >
                    <path
                      fill="#FFA000"
                      d="m14.714 8.669-2.4 2.235-2.228-4.496 1.151-2.585c.291-.516.767-.522 1.058 0l2.419 4.846z"
                    />
                    <path
                      fill="#F57F17"
                      d="m12.314 10.903-8.979 8.351 6.751-12.846 2.228 4.495z"
                    />
                    <path
                      fill="#FFCA28"
                      d="M17.346 5.251c.43-.41.873-.271.985.31l2.334 13.58-7.742 4.648c-.272.152-.992.211-.992.211s-.655-.08-.906-.218l-7.689-4.528 14.01-14.003z"
                    />
                    <path
                      fill="#FFA000"
                      d="m10.086 6.408-6.75 12.846L6.344.477c.113-.582.443-.641.74-.126l3.002 6.057z"
                    />
                  </svg>
                </div>
                <div className={`${styles.languages}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="75"
                    viewBox="0 0 512 146"
                    id="mongodb"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path
                        fill="#8E714E"
                        d="M476.713 60.463c-.46.092-.922 1.107-.922 1.66-.092 3.692-.184 13.474-.184 20.118 0 .185.276.554.553.554 1.384.092 4.706.184 7.567.184 3.968 0 6.275-.553 7.568-1.106 3.321-1.662 4.89-5.261 4.89-9.23 0-8.95-6.275-12.365-15.596-12.365-.646-.092-2.49-.092-3.876.185zm23.81 41.25c0-9.136-6.737-14.212-18.918-14.212-.554 0-4.43-.092-5.353.092-.277.093-.645.278-.645.555 0 6.551-.093 16.98.184 21.04.184 1.753 1.477 4.245 3.046 4.983 1.66.923 5.444 1.107 8.028 1.107 7.29 0 13.658-4.06 13.658-13.565zm-42.634-46.325c.922 0 3.69.276 10.796.276 6.737 0 12.089-.184 18.641-.184 8.028 0 19.102 2.86 19.102 14.857 0 5.906-4.153 10.613-9.597 12.92-.276.092-.276.276 0 .368 7.751 1.939 14.581 6.737 14.581 15.78 0 8.86-5.537 14.489-13.566 17.996-4.891 2.122-10.981 2.86-17.164 2.86-4.707 0-17.349-.553-24.362-.368-.738-.278.646-3.6 1.291-4.153 1.662-.093 2.953-.185 4.707-.739 2.492-.645 2.768-1.384 3.137-5.167.185-3.23.185-14.674.185-22.794 0-11.166.093-18.733 0-22.424-.092-2.86-1.107-3.784-3.137-4.338-1.57-.276-4.153-.646-6.276-.922-.462-.462 1.107-3.6 1.662-3.968zm-53.248 57.399c2.216 1.752 6.553 2.49 10.429 2.49 4.983 0 9.966-.921 14.765-5.26 4.891-4.428 8.305-11.257 8.305-22.146 0-10.429-3.968-18.919-12.089-23.901-4.614-2.862-10.52-4.06-17.349-4.06-2.03 0-3.968.092-5.167.645-.278.185-.923 1.015-.923 1.476-.185 1.846-.185 16.057-.185 24.363 0 8.582 0 20.579.185 21.963 0 1.385.645 3.507 2.03 4.43zm-20.948-57.4c1.754 0 8.49.277 11.72.277 5.815 0 9.967-.276 20.948-.276 9.228 0 16.98 2.491 22.517 7.197 6.736 5.814 10.244 13.843 10.244 23.624 0 13.935-6.368 21.964-12.736 26.578-6.366 4.706-14.672 7.474-26.484 7.474-6.275 0-17.072-.184-26.024-.277h-.092c-.461-.83.738-4.06 1.476-4.152 2.4-.277 3.046-.37 4.246-.83 1.937-.739 2.307-1.754 2.584-5.168.276-6.368.184-14.027.184-22.702 0-6.182.092-18.272-.093-22.148-.276-3.229-1.66-4.06-4.429-4.614-1.384-.276-3.23-.646-5.813-.922-.37-.647 1.291-3.507 1.752-4.06z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M272.033 116.385c-2.307-.277-3.968-.645-5.998-1.568-.277-.185-.739-1.107-.739-1.477-.184-3.23-.184-12.458-.184-18.64 0-4.984-.83-9.321-2.953-12.366-2.492-3.508-6.09-5.537-10.705-5.537-4.06 0-9.505 2.768-14.027 6.644-.092.092-.83.739-.738-.277 0-1.015.185-3.045.277-4.43.093-1.292-.646-1.937-.646-1.937-2.953 1.476-11.258 3.414-14.304 3.69-2.214.463-2.768 2.585-.46 3.323h.092c2.49.738 4.152 1.569 5.443 2.4.923.738.831 1.753.831 2.584.092 6.92.092 17.533-.184 23.347-.092 2.307-.738 3.137-2.4 3.506l.185-.092c-1.292.277-2.307.553-3.876.738-.554.554-.554 3.507 0 4.153 1.015 0 6.367-.277 10.798-.277 6.09 0 9.228.277 10.796.277.646-.738.831-3.507.462-4.153-1.754-.092-3.046-.276-4.245-.646-1.661-.37-2.123-1.199-2.216-3.137-.183-4.892-.183-15.227-.183-22.24 0-1.938.553-2.861 1.106-3.415 2.123-1.845 5.538-3.137 8.583-3.137 2.953 0 4.89.923 6.367 2.123 2.03 1.66 2.676 4.06 2.953 5.813.461 3.968.277 11.812.277 18.641 0 3.691-.277 4.614-1.66 5.075-.647.277-2.308.647-4.246.83-.646.647-.461 3.508 0 4.154 2.676 0 5.814-.277 10.428-.277 5.721 0 9.413.277 10.89.277.46-.554.645-3.23.276-3.969zm25.562-35.25c-4.89 0-7.936 3.783-7.936 9.688 0 5.999 2.676 12.92 10.243 12.92 1.292 0 3.692-.554 4.798-1.846 1.754-1.66 2.954-4.983 2.954-8.49 0-7.659-3.784-12.273-10.059-12.273zm-.646 40.787c-1.845 0-3.138.554-3.968 1.016-3.876 2.49-5.629 4.89-5.629 7.752 0 2.675 1.015 4.797 3.23 6.643 2.676 2.307 6.367 3.415 11.073 3.415 9.413 0 13.566-5.076 13.566-10.058 0-3.508-1.754-5.815-5.352-7.106-2.584-1.108-7.29-1.662-12.92-1.662zm.646 23.994c-5.629 0-9.69-1.2-13.196-3.876-3.415-2.584-4.891-6.46-4.891-9.136 0-.738.185-2.769 1.846-4.614 1.014-1.108 3.23-3.23 8.49-6.829.184-.092.276-.184.276-.37 0-.184-.185-.369-.369-.46-4.337-1.661-5.629-4.338-5.999-5.814v-.185c-.091-.554-.276-1.107.555-1.661.646-.461 1.569-1.015 2.583-1.66 1.569-.924 3.23-1.939 4.245-2.77.185-.184.185-.368.185-.553 0-.185-.185-.37-.37-.461-6.458-2.123-9.688-6.922-9.688-14.12 0-4.706 2.122-8.951 5.905-11.627 2.584-2.03 9.044-4.522 13.289-4.522h.277c4.337.092 6.736 1.015 10.15 2.215 1.846.646 3.6.922 6 .922 3.598 0 5.167-1.107 6.458-2.398.093.184.278.646.37 1.845.092 1.2-.277 2.953-1.2 4.245-.738 1.015-2.399 1.754-4.06 1.754h-.462c-1.661-.185-2.4-.37-2.4-.37l-.368.185c-.092.185 0 .369.092.646l.093.185c.184.83.553 3.321.553 3.968 0 7.567-3.045 10.888-6.275 13.38-3.138 2.307-6.736 3.783-10.797 4.153-.092 0-.46 0-1.292.092-.461 0-1.107.093-1.2.093h-.092c-.738.184-2.583 1.107-2.583 2.675 0 1.384.83 3.046 4.798 3.323.83.092 1.66.092 2.584.185 5.26.368 11.812.83 14.857 1.845 4.245 1.568 6.921 5.352 6.921 9.874 0 6.83-4.89 13.197-13.011 17.164-3.968 1.754-7.937 2.677-12.274 2.677zm52.6-64.32c-1.937 0-3.691.46-4.983 1.383-3.598 2.215-5.444 6.645-5.444 13.104 0 12.09 6.09 20.58 14.765 20.58 2.584 0 4.614-.739 6.367-2.215 2.676-2.216 4.061-6.645 4.061-12.828 0-11.996-5.999-20.025-14.765-20.025zm1.662 39.496c-15.688 0-21.317-11.535-21.317-22.332 0-7.567 3.045-13.381 9.135-17.534 4.338-2.676 9.506-4.152 14.12-4.152 11.996 0 20.394 8.582 20.394 20.948 0 8.397-3.322 15.041-9.69 19.102-3.045 2.03-8.305 3.968-12.643 3.968h.001zM187.411 81.595c-1.938 0-3.691.461-4.984 1.384-3.598 2.215-5.444 6.645-5.444 13.104 0 12.09 6.09 20.58 14.765 20.58 2.584 0 4.614-.739 6.368-2.215 2.675-2.216 4.06-6.645 4.06-12.828 0-11.996-5.906-20.025-14.765-20.025zm1.661 39.497c-15.688 0-21.317-11.535-21.317-22.332 0-7.567 3.045-13.381 9.135-17.534 4.338-2.676 9.506-4.152 14.12-4.152 11.997 0 20.394 8.582 20.394 20.948 0 8.397-3.322 15.041-9.69 19.102-2.953 2.03-8.213 3.968-12.642 3.968zm-105.478-.923c-.185-.276-.37-1.107-.277-2.122 0-.739.185-1.2.277-1.384 1.938-.278 2.953-.555 4.06-.831 1.846-.462 2.584-1.476 2.676-3.783.278-5.537.278-16.058.185-23.348v-.185c0-.83 0-1.846-1.015-2.584-1.477-.922-3.23-1.752-5.537-2.4-.83-.275-1.384-.737-1.292-1.29 0-.554.554-1.2 1.754-1.385 3.045-.277 10.98-2.214 14.118-3.599.185.184.462.739.462 1.477l-.092 1.014c-.093 1.016-.185 2.216-.185 3.415 0 .369.37.646.738.646.185 0 .37-.092.554-.185 5.906-4.614 11.258-6.275 14.026-6.275 4.523 0 8.03 2.123 10.706 6.552.184.278.369.37.646.37.184 0 .46-.092.553-.277 5.445-4.153 10.89-6.645 14.488-6.645 8.582 0 13.658 6.368 13.658 17.165 0 3.045 0 7.013-.092 10.613 0 3.229-.092 6.182-.092 8.305 0 .46.645 1.937 1.66 2.214 1.292.646 3.046.923 5.353 1.292h.092c.185.646-.184 3.045-.553 3.507-.554 0-1.385 0-2.307-.092a136.208 136.208 0 0 0-7.014-.185c-5.721 0-8.674.092-11.536.277-.183-.738-.276-2.953 0-3.507 1.662-.276 2.492-.554 3.508-.83 1.846-.554 2.307-1.385 2.4-3.784 0-1.753.368-16.703-.186-20.302-.553-3.691-3.322-8.028-9.413-8.028-2.307 0-5.905.923-9.412 3.598-.184.185-.37.646-.37.923v.093c.37 1.937.37 4.153.37 7.567v5.998c0 4.153-.093 8.029 0 10.981 0 2.031 1.2 2.492 2.215 2.862.554.091.922.184 1.384.276.83.185 1.661.37 2.953.646.185.37.185 1.569-.092 2.584-.093.554-.278.83-.37.923-3.137-.092-6.367-.185-11.073-.185-1.384 0-3.784.093-5.814.093-1.662 0-3.23.092-4.152.092-.093-.185-.278-.83-.278-1.846 0-.83.185-1.476.37-1.661.461-.092.83-.184 1.292-.184 1.106-.185 2.03-.37 2.952-.554 1.57-.461 2.123-1.292 2.215-3.322.277-4.614.554-17.81-.092-21.133-1.107-5.352-4.152-8.028-9.044-8.028-2.86 0-6.46 1.384-9.412 3.6-.462.368-.831 1.29-.831 2.121v5.445c0 6.644 0 14.95.092 18.549.093 1.106.461 2.399 2.584 2.86.462.092 1.2.277 2.123.37l1.66.276c.186.554.093 2.769-.276 3.507-.923 0-2.03-.092-3.323-.092-1.937-.093-4.429-.185-7.197-.185-3.23 0-5.537.092-7.383.185-1.292-.185-2.307-.185-3.414-.185z"
                      />
                      <path
                        fill="#FFF"
                        d="M35.053 142.317l-3.783-1.293s.462-19.286-6.46-20.67c-4.613-5.353.74-227.013 17.35-.739 0 0-5.722 2.86-6.737 7.752-1.108 4.799-.37 14.95-.37 14.95z"
                      />
                      <path
                        fill="#A6A385"
                        d="M35.053 142.317l-3.783-1.293s.462-19.286-6.46-20.67c-4.613-5.353.74-227.013 17.35-.739 0 0-5.722 2.86-6.737 7.752-1.108 4.799-.37 14.95-.37 14.95z"
                      />
                      <path
                        fill="#FFF"
                        d="M37.084 123.676s33.13-21.779 25.377-67.09c-7.474-32.943-25.1-43.74-27.038-47.893C33.301 5.74 31.27.573 31.27.573l1.385 91.634c0 .093-2.861 28.054 4.43 31.47"
                      />
                      <path
                        fill="#499D4A"
                        d="M37.084 123.676s33.13-21.779 25.377-67.09c-7.474-32.943-25.1-43.74-27.038-47.893C33.301 5.74 31.27.573 31.27.573l1.385 91.634c0 .093-2.861 28.054 4.43 31.47"
                      />
                      <path
                        fill="#FFF"
                        d="M29.333 124.875S-1.767 103.65.079 66.277C1.832 28.903 23.795 10.539 28.04 7.217c2.769-2.953 2.861-4.061 3.046-7.014 1.938 4.153 1.569 62.106 1.845 68.934.83 26.3-1.476 50.756-3.598 55.738z"
                      />
                      <path
                        fill="#58AA50"
                        d="M29.333 124.875S-1.767 103.65.079 66.277C1.832 28.903 23.795 10.539 28.04 7.217c2.769-2.953 2.861-4.061 3.046-7.014 1.938 4.153 1.569 62.106 1.845 68.934.83 26.3-1.476 50.756-3.598 55.738z"
                      />
                    </g>
                  </svg>
                </div>
                <div className={`${styles.languages}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={75}
                    height={75}
                    viewBox="0 0 24 24"
                    id="mysql"
                  >
                    <path
                      fill="#105E86"
                      d="M6.532 19.554c-.146 0-.276-.009-.386-.026v.485c.226.09.413.135.566.135.573 0 1.101-.35 1.583-1.053.616-.91 1.114-2.371 1.492-4.379h-.88a14.741 14.741 0 0 1-.835 3.419c.028-.209-.041-.576-.205-1.102l-.727-2.317h-.91l1.014 3.099c.153.465.23.775.23.927 0 .219-.098.417-.295.594-.164.144-.379.218-.647.218z"
                    />
                    <path
                      fill="#DE8A03"
                      d="M19.482 13.293v5.429h2.63v-.668h-1.745v-4.761z"
                    />
                    <path
                      fill="#105E86"
                      d="M1.04 14.392h.01l1.4 4.33h.705l1.41-4.33h.008a49.03 49.03 0 0 1 .27 4.33h.93a57.767 57.767 0 0 0-.428-5.429H4.25l-1.347 3.99h-.008l-1.335-3.99H.41A54.641 54.641 0 0 0 0 18.722h.845c.027-1.588.092-3.031.195-4.33z"
                    />
                    <path
                      fill="#DE8A03"
                      d="M18.679 15.906c0-1.796-.718-2.696-2.155-2.696-.704 0-1.254.228-1.65.684-.43.499-.646 1.233-.646 2.204 0 .954.19 1.655.574 2.101.35.403.877.604 1.583.604.264 0 .506-.032.725-.096l1.325.758.36-.61h-.003l-1.016-.491c.09-.075.177-.155.255-.245.433-.498.648-1.236.648-2.213zm-2.203 2.225c-.445 0-.77-.164-.978-.491l.002-.005c-.225-.353-.337-.923-.337-1.704 0-1.368.424-2.052 1.27-2.052.443 0 .77.164.977.491.224.355.336.919.336 1.692 0 1.378-.424 2.069-1.27 2.069zM13.2 16.074s-.794-.447-1.187-.658c-.432-.236-.666-.513-.666-.834a.67.67 0 0 1 .248-.515c.152-.136.371-.202.654-.202.349 0 .704.076 1.064.226l.213-.467a2.544 2.544 0 0 0-1.4-.402c-.5 0-.905.134-1.22.407-.313.27-.47.623-.47 1.065 0 .531.21.854.632 1.156 0 0 .775.436 1.163.645.418.231.648.506.648.83a.737.737 0 0 1-.3.604c-.19.144-.451.216-.783.216-.357 0-.752-.106-1.19-.322l-.237.467c.509.337 1.03.506 1.573.506.581 0 1.04-.147 1.384-.442.344-.294.516-.673.516-1.135l.006.003c0-.529-.215-.848-.648-1.148z"
                    />
                    <path
                      fill="#105E86"
                      d="M16.405 5.768c-.115 0-.193.014-.274.032v.013h.014c.054.102.146.177.214.268.054.105.1.21.154.314l.014-.015c.094-.065.14-.169.14-.327-.04-.046-.046-.092-.08-.137-.04-.066-.126-.098-.18-.15l-.002.002z"
                    />
                    <path
                      fill="#105E86"
                      d="M23.695 13.2a3.215 3.215 0 0 0-.695-.663c-.214-.143-.682-.344-.77-.584l-.013-.014c.146-.013.32-.065.46-.104.227-.059.435-.046.67-.104.106-.026.213-.059.32-.092v-.059c-.12-.118-.21-.278-.334-.388a8.86 8.86 0 0 0-1.104-.808c-.21-.132-.476-.216-.697-.328-.08-.039-.214-.059-.26-.125-.12-.143-.19-.334-.275-.505-.192-.361-.38-.761-.547-1.142-.12-.257-.193-.513-.34-.749-.69-1.116-1.437-1.793-2.586-2.454-.247-.137-.543-.196-.856-.269-.167-.008-.334-.02-.5-.027-.11-.046-.216-.171-.31-.231-.38-.236-1.364-.746-1.644-.071-.18.426.267.846.422 1.062.115.15.26.322.34.491.047.114.06.231.107.35.106.289.207.61.347.881.073.137.153.282.247.405.054.072.146.105.167.223-.094.134-.1.328-.154.491-.24.743-.146 1.662.194 2.209.107.163.362.524.703.386.3-.118.234-.491.32-.82.02-.079.007-.131.048-.184v.015c.094.185.188.36.274.545.206.322.566.656.867.879.16.118.287.322.487.395v-.02h-.015c-.043-.057-.1-.084-.154-.131a3.384 3.384 0 0 1-.35-.393 8.58 8.58 0 0 1-.747-1.196c-.11-.206-.202-.428-.29-.631-.04-.078-.04-.196-.107-.236-.1.143-.247.268-.32.445-.127.283-.14.63-.188.992-.027.007-.014 0-.027.014-.214-.051-.287-.269-.367-.452-.2-.466-.233-1.215-.06-1.753.047-.137.247-.571.167-.703-.042-.125-.174-.196-.247-.297a2.444 2.444 0 0 1-.24-.419c-.16-.367-.24-.774-.414-1.141-.08-.17-.22-.348-.334-.504-.127-.177-.267-.301-.368-.511-.033-.072-.08-.191-.027-.269.014-.053.042-.074.094-.088.088-.071.335.022.422.061.247.098.455.19.662.328.094.065.195.189.315.222h.14c.214.046.455.014.655.072.355.112.675.275.962.452a5.885 5.885 0 0 1 2.085 2.244c.08.151.115.29.188.447.14.324.313.651.455.964.14.309.275.625.476.881.1.137.502.209.682.281.133.059.34.113.46.185.23.137.454.295.67.446.11.075.443.239.463.371-.535-.014-.95.039-1.297.185-.1.039-.26.039-.274.164.055.052.063.137.11.21.08.131.218.307.346.4.14.108.28.212.427.304.26.157.555.25.81.408.145.092.293.209.44.307.073.049.12.138.214.169V13.6c-.046-.059-.06-.144-.105-.21-.067-.066-.134-.125-.2-.19z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="row" style={{ margin: "40px 0" }} ref={projectTitle}>
        <div className="col-md-12">
          <h6 className={`text-white ${styles.projectHeader}`}>
            Projects I&apos;ve completed
          </h6>
        </div>
      </div>

      <div
        className="container-fluid"
        ref={project}
        onMouseEnter={() => setIsSlideHovered(true)}
        onMouseLeave={() => setIsSlideHovered(false)}
      >
        <div className={`row ${styles.projectContainer}`}>
          <div
            className={`col-md-1 col-lg-1 ${styles.leftArrow}`}
            onClick={handleLeftArrowClick}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "hidden",
              width: "80%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                transition: "transform 0.5s ease-out",
                width: "100%",
              }}
            >
              {/* <div className="card" style={{ width: "300px", height: "500px", backgroundImage: `url$(${projects[0].image})` }}></div>
              <div className="card" style={{ width: "300px", height: "500px", backgroundImage: `url$(${projects[0].image})` }}></div>

              <div className="card" style={{ width: "300px", height: "500px", backgroundImage: `url$(${projects[0].image})` }}></div> */}

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: index === currentSlide ? "80%" : "10%",
                    height: "500px",
                    transition: "width 0.5s ease-out",
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div
            className={`col-md-1 col-lg-1 ${styles.rightArrow}`}
            onClick={handleRightArrowClick}
          ></div>
        </div>
        <div
          className={styles.projectHighlight}
          onClick={() => window.open(projects[currentSlide].link)}
        >
          <h4
            className="text-center text-white fs-1 fw-light pt-5"
            style={{ textShadow: "2px 2px 2px #1E0342" }}
          >
            {projects[currentSlide].name}
          </h4>
          <p className="text-center text-white fs-5 fw-light">
            {projects[currentSlide].description}
          </p>
          <h6 className="text-center text-white fs-5 fw-light py-5">
            <span
              style={{
                height: "20px",
                width: "20px",
                display: "inline-block",
                marginRight: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                id="open"
                fill="white"
              >
                <switch>
                  <g>
                    <path d="M88 48a4 4 0 0 0-4 4v28c0 2.21-1.79 4-4 4H16c-2.21 0-4-1.79-4-4V16c0-2.21 1.79-4 4-4h28a4 4 0 0 0 0-8H16C9.373 4 4 9.373 4 16v64c0 6.627 5.373 12 12 12h64c6.627 0 12-5.373 12-12V52a4 4 0 0 0-4-4zm4-40v24a4 4 0 0 1-8 0V17.656l-32.771 32.77a4 4 0 0 1-5.655-5.656L78.343 12H64a4 4 0 0 1 0-8h24a4 4 0 0 1 4 4z" />
                  </g>
                </switch>
              </svg>
            </span>
            Open application
          </h6>
        </div>
      </div>

      <div className="row" style={{ margin: "40px 0" }} ref={testimonials}>
        <div className="col-md-12">
          <h1 className={`text-white ${styles.contactHeader}`}>Testimonials</h1>
        </div>
      </div>

      <div className="row text-white" style={{ margin: "0 0 100px 0" }} ref={footer}>
        <div className={`col-md-4 ${styles.testimonials}`}>
          <div className={styles.stars}>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <figure>
            <blockquote>
            &quot;Ralph is a very talented developer. He is very passionate about
              his work and is always looking for ways to improve. He is a great
              team player and is always willing to help others.&quot;
            </blockquote>
            <figcaption>
              <strong>Jem Alcantara</strong>
              <p>Manager</p>
            </figcaption>
          </figure>
        </div>
        <div className={`col-md-4 ${styles.testimonials}`}>
          <div className={styles.stars}>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <figure>
            <blockquote>
            &quot;The app is now complete and functioning excellently with no bugs.
              We will keep you updated, but as of now, everything is running
              smoothly. Thank you for the great work.&quot;
            </blockquote>
            <figcaption>
              <strong>Aubrey</strong>
              <p>Client</p>
            </figcaption>
          </figure>
        </div>
        <div className={`col-md-4 ${styles.testimonials}`}>
          <div className={styles.stars}>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <figure>
            <blockquote>
            &quot;Thank you very much. My daughter said that you have already sent
              it. Sorry if I&apos;m being persistent and I was the one they mentioned
              in the group chat earlier. Thank you again.&quot;
            </blockquote>
            <figcaption>
              <strong>Dee Online Shoppe</strong>
              <p>Client</p>
            </figcaption>
          </figure>
        </div>
      </div>

      <footer ref={footer}>
        <div className="container">
          <p className="text-white fs-6 opacity-75 mb-0 text-center">
            Designed using Figma, Bootstrap and CSS
          </p>
          <p className="text-white fs-6 opacity-75 text-center">
            Coded by Ralph Jenrey Loquellano
          </p>
        </div>
      </footer>
    </>
  );
}
