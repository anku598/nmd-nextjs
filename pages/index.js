

import React, { Suspense, useCallback, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bounds, Float, Html, OrbitControls, Reflector, Stage, Text, useAspect } from '@react-three/drei';
import { useState } from 'react';
import Router from 'next/router';
import { useSpring, animated, config } from "@react-spring/three";

import { useControls } from 'leva';
import * as THREE from 'three'
import { Fog, MathUtils } from 'three';
import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap'
import { PresentationControls } from '@react-three/drei';
import { ContactShadows } from '@react-three/drei';
import { useProgress } from '@react-three/drei';
import { Stats } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import { SSAO } from '@react-three/postprocessing';
import { SMAA } from '@react-three/postprocessing';
import { EdgeDetectionMode } from 'postprocessing';
import { Environment } from '@react-three/drei';
import { useEnvironment } from '@react-three/drei';
import { useTexture } from '@react-three/drei';
import { Model } from './../components/Model';
import CameraController from './../components/CameraController';
import Lights from './../components/Lights';


export default function Home() {
  let content = [
    {
      name: 'P_1',
      title: ' Language Movement in 1952',
      content: `<p>
      The battle to protect a sophisticated, more than a 1,000-year-old language was just one aspect of the language movement. Fighting for social and economic fairness was the goal. a struggle to preserve one's own individuality when government steps were being taken to stifle it. A battle fought by regular individuals who only wanted to survive. Women and children are fighting for the ability of future generations to say 'moder gorob, moder aasha, a'mori Bangla bhasha. The Bengali language, also known as Bangla, plays a significant role in the history of Bengali speakers all over the world. In fact, Bangla is closely associated with the origins of modern-day Bangladesh. Bangla is currently the sixth most widely spoken language in the world.
      </p>`
    },

    {
      name: 'P_2',
      title: 'The provincial election victory of the United Front in 1954',
      content: `<p>
      East Bengal's first provincial general election for the East Bengal Legislative Assembly was contested and won by a combination of political parties known as the United Front.
      </p> 

      <p>
      The Awami Muslim League, the Krishak Praja Party, the Ganatantri Dal (Democratic Party), and Nizam-e-Islam made up the coalition. Three prominent populist figures from Bengal, A. K. Fazlul Huq, Huseyn Shaheed Suhrawardy, and Maulana Bhashani, headed the coalition. 
      </p>
      
      <p>
      The Muslim League suffered a humiliating loss in the election. Khaleque Nawaz Khan, a seasoned student leader from East Pakistan, beat Mr Nurul Amin, the country's current prime minister, in the Nandail Constituency in the Mymensingh district and made political history. 
      </p>
      
      <p>
      A 27-year-old young Turk from the United Front defeated Nurul Amin in a resounding loss that virtually ended the Muslim League from East Pakistan's political scene at the time. In the 309-member legislature, United Front parties won easily and picked up 223 seats. With 143 seats, the Awami League won the majority position. </p>
      `
    },

    {
      name: 'P_3',
      title: 'Constitution Movement in 1956',
      content: `<p>
      
      Bangladesh's Constitution is the country's highest law. The text lays forth the foundation for the Bangladeshi republic, which includes a unitary, parliamentary democracy, an independent judiciary, a democratic local government, and a national bureaucracy. It also enshrines fundamental human rights and freedoms.</p> 

      <p>
      Nationalism, socialism, democracy, and secularism are the four cornerstones of the Constitution. The Constitution aims to establish a socialist society where everyone has access to the rule of law, fundamental human rights, freedom, and political, economic, and social fairness. 
      </p>
      
      <p>
      Bangladesh is obligated to "contribute to world peace and cooperation in conformity with the progressive aspirations of mankind," according to this commitment. Since a constituent assembly, not Parliament, constituted it, it claims constitutional supremacy rather than legislative supremacy.
      </p> 
      
     <p>
     It was approved by Bangladesh's Constituent Assembly on November 4 and went into effect on December 16 of that same year. The Proclamation of Independence was superseded as the primary governing document of the nation by the Constitution. On Bangladesh's Victory Day, exactly one year after the Instrument of Surrender was signed, the Constitution went into force.
     </p>
      `
    },
    {
      name: 'P_4',
      title: 'The movement against the Education Commission in 1962',
      content: `<p>
      Ayub Khan, the country's then-president, established a panel in 1959 to develop a framework for national education strategy, with SM Sharif serving as its secretary of education.
      </p>

      <p>
      Due to various features that were anti-poor and prejudiced, the report of the commission, which was released in 1962, caused student unrest in what was now East Pakistan (now known as the People's Republic of Bangladesh).
      </p>
     
     <p>
     Finally, Ayub Khan stopped that policy's implementation. Martial law was declared and General Ayub Khan was elected president in 1958.
     </p>
     
     <p>
     Despite the commission's classification of education as an investment, costs were higher. People in then-Pakistan, especially in erstwhile East Pakistan, had unfavourable reactions to this story. Students of "degrees" oppose the commission's planned three-year degree program. 
     </p>
     
    <p>
    Later, students from other courses join them, and in August 1962, the campaign gains notoriety thanks to the involvement of regular people. On September 17, 1962, agitators declared a "hartal," which they successfully observed with the inevitable loss of life. 
    </p>
     
     `
    },
    {
      name: 'P_5',
      title: 'Six point movement in 1966',
      content: `<p>
      The Six-Point Programme is a list of requests made by the Awami League to terminate the internal colonial control of West Pakistan in East Bengal and eliminate inequality between the two wings of Pakistan.
      </p>

      <p>
      
      The Taskent Treaty was put into effect in 1965, bringing an end to the Indo-Pak War. The complaint of central government carelessness and disinterest towards the defence of East Pakistan has been added to the long-standing issues of economic imbalance. On this subject, Bangabandhu Sheikh Mujibur Rahman said up.
      </p>

      <p>
      
      On February 21, 1966, the Awami League working committee met. The proposal to adopt the Six-Point Programme and a plan of action for achieving the demands was presented, and it was adopted unanimously. The Six-Point Programme was released in a booklet with an introduction by Tajuddin Ahmad and Bangabandhu Sheikh Mujibur Rahman.
      </p>

       
      `
    },
    {
      name: 'P_6',
      title: 'Mass Uprising in 1969',
      content: `

      <p>
      Student rebellion in 1968 against Pakistani President Ayub Khan's authoritarian government served as the catalyst for the 1969 Mass Upsurge. Peasants, craftsmen, and labourers rapidly joined the movement nearly in unison, and it eventually included the entirety of then-East Pakistan. 
      </p>

      <p>
      The industrial belts' working class and low- and middle-income groups swiftly transformed the movement into a fight for economic liberation as a result of the persistent exaction of unjust demands.
      </p>


      <p>
      The mass uprising of 1969 was directly influenced by the racial oppression and deprivation of the Bangalis inside the framework of Pakistan, in contrast to the language movement, which gave rise to a sense of distinct identity and a quest for autonomy. In fact, this collective awakening was the biggest one since the creation of Pakistan. 
      </p>
 
      
      `
    },

    {
      name: 'P_7',
      title: 'Independence War in 1971',
      content: `

      <p>
      The War of Independence, which started on March 26, 1971, came to a conclusion on December 16, 1971, with the liberation of Bangladesh. The armed conflict was the result of a string of occurrences, circumstances, and problems that had been causing East and West Pakistan's ties to steadily deteriorate. 
      </p>

      
      <p>
    
      Since Pakistan's independence from Britain in 1947, issues such as land reforms, the state language, economic and administrative disparities between the two wings, provincial autonomy, the defence of East Pakistan, and numerous other consequential issues have strained relations between the two wings of the country.
       
      </p>


      
      <p>
    
      Bangabandhu Sheikh Mujibur Rahman, head of the Awami League, which won 167 out of 169 seats in the general elections of 1970, became the only representative of the people of East Pakistan and the majority leader in the Pakistan National Assembly. However, Sheikh Mujibur Rahman and his party had been denied the chance to become prime ministers by the civil and military governing clique in Pakistan. 
       
      </p>

      
      <p>
    

      Additionally, Sheikh Mujib resisted being persuaded to make unwarranted accommodations. This was made abundantly plain to the Pakistani military junta in Sheikh Mujib's momentous speech on March 7, 1971. The movement for civil disobedience then started. Sheikh Mujib and President Yahya Khan have begun negotiations to settle the remaining concerns 
      </p>

      
      `
    }
  ]


  const [activePillerColor, setActivePillerColor] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [hoveredp1, setHoveredp1] = useState(false)
  const [hoveredp2, setHoveredp2] = useState(false)
  const [hoveredp3, setHoveredp3] = useState(false)
  const [hoveredp4, setHoveredp4] = useState(false)
  const [hoveredp5, setHoveredp5] = useState(false)
  const [hoveredp6, setHoveredp6] = useState(false)
  const [hoveredp7, setHoveredp7] = useState(false)

  // const hoverColorp1 = useSpring({ color: hoveredp1 ? "orange" : "#fff" });
  const hoverColorp1 = useSpring({ color: hoveredp1 || activePillerColor === 'P_1' ? "#b2954d" : "#fff" });
  const hoverColorp2 = useSpring({ color: hoveredp2 || activePillerColor === 'P_2' ? "#b2954d" : "#fff" });
  const hoverColorp3 = useSpring({ color: hoveredp3 || activePillerColor === 'P_3' ? "#b2954d" : "#fff" });
  const hoverColorp4 = useSpring({ color: hoveredp4 || activePillerColor === 'P_4' ? "#b2954d" : "#fff" });
  const hoverColorp5 = useSpring({ color: hoveredp5 || activePillerColor === 'P_5' ? "#b2954d" : "#fff" });
  const hoverColorp6 = useSpring({ color: hoveredp6 || activePillerColor === 'P_6' ? "#b2954d" : "#fff" });
  const hoverColorp7 = useSpring({ color: hoveredp7 || activePillerColor === 'P_7' ? "#b2954d" : "#fff" });


  // const [showHoverContent, setShowHoverContent] = useState(false)
  const [show, setShow] = useState(false)
  const [activeContent, setActiveContent] = useState({})
  const [activeHoverContent, setActiveHoverContent] = useState({})
  const [startAnimation, setStartAnimation] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const [checkName, setCheckName] = useState('')
  const showSidebar = (name) => {

    if (name === checkName) {
      let data = content.filter((elem) => elem.name === name)
      setActiveContent(data[0])
      setShow(false)
      setCheckName(name)

    }
    else {
      let data = content.filter((elem) => elem.name === name)
      setActiveContent(data[0])
      setShow(true)
      setCheckName(name)
    }
    setActivePillerColor(name)
  }


  const handleHoverIn = (name) => {
    let data = content.filter((elem) => elem.name === name)
    if (firstTime) {
      setStartAnimation(true)
      setActiveHoverContent(data[0])
      setFirstTime(false)
    } else {
      setTimeout(() => {
        setStartAnimation(true)
        setActiveHoverContent(data[0])
      }, 400)
    }
  }

  const handleHoverOut = () => {
    setStartAnimation(false)
    setTimeout(() => {
      setActiveHoverContent({})
    }, 400)

    // setShowHoverContent(false)
  }







  useEffect((e) => {

    var cursor = document.querySelector('.cursor');
    var cursorinner = document.querySelector('.cursor2');

    document.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      if (hovered) {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0);`
        cursor.style.opacity = '0'
      } else if (!hovered) {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
        cursor.style.opacity = '1'
      }
    });

    document.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      if (hovered) {
        cursorinner.style.left = x + 'px';
        cursorinner.style.top = y + 'px';
        cursorinner.style.opacity = '1'
      } else if (!hovered) {
        cursorinner.style.left = x + 'px';
        cursorinner.style.top = y + 'px';
        cursorinner.style.opacity = '0'
      }
    });

  }, [hovered])

  const materialProps = { color: '#fff', opacity: 1, roughness: 0.20, metalness: 0.43, }


  const [zoom, setZoom] = useState(false)

  const app = useRef()


  const introSpan = useRef()
  const bigTitle = useRef()
  const introtxt = useRef()
  const btnWrap = useRef()

  useEffect(() => {

    const text = document.querySelector('.big-title');
    const tl = gsap.timeline({ delay: 0.3 })

    tl
      .fromTo(bigTitle.current, {
        y: 200,
        rotation: 0.001,
        opacity: 0
      }, {
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: 'power4.easeInOut',
        duration: 1,
      }, 'start')
      .fromTo(introSpan.current, { y: -50, rotation: 0.001, autoAlpha: 0 }, {
        y: 0, rotation: 0, autoAlpha: 1, ease: 'power4.easeInOut',
        duration: 0.7,
      }, 'start+=0.8')
      .fromTo(introtxt.current, { y: 50, rotation: 0.001, autoAlpha: 0 }, {
        y: 0, rotation: 0, autoAlpha: 1, ease: 'power4.easeInOut',
        duration: 0.7,
      }, 'start+=0.9')
      .fromTo(btnWrap.current, { y: 200, rotation: 0.001, }, {
        y: 0, rotation: 0, opacity: 1, ease: 'power4.easeInOut',
        duration: 0.7,
      }, 'start+=1')
    // .fromTo('.logo', { y: 50, opacity: 0 }, {
    //   y: 0, opacity: 1, ease: 'power4.out', delay: 1,
    //   duration: 1.2
    // }, 'start+=1.1')

  }, [])





  const [width, height] = useWindowSize();



  // const materialProps = useControls({ color: '#fff', opacity: 1, emissive: '#00000', roughness: 0.20, metalness: 0.43 })

  return (
    <>
      <div ref={app} className="main-wrap">
        <div className="cursor"></div>
        <div className="cursor2">{hovered ? 'Click' : ''}</div>
        <div className='wrapper' >
          {/* <header>
            <div className="logo">
              <img src="./codesign_logo.svg" alt="" />
            </div>
          </header> */}
          {/* <OtherText zoom={zoom} /> */}

          <div className={`${show ? 'empty-clickable' : ''} `} onClick={(e) => (e.stopPropagation(), setActivePillerColor(null), setShow(false), setCheckName(''))}></div>
          <div className={`sidebar ${show ? 'reveal' : ''}`}>

            <SideDrawer show={show} activeContent={activeContent} setShow={setShow} setName={setCheckName} setActivePillerColor={setActivePillerColor} />
          </div>


          <div className={`canvas-wrapper ${show ? 'canvas-left' : ''}`} >
            <Canvas dpr={[1, 2]} style={{ width: width, height: height }}
              shadows className='fadeIn' camera={{ fov: 35 }} gl={{ antialias: true }}>
              <color args={["#fff"]} attach="background" />

              <Lights />
              <Suspense fallback={null}>
                <group position={[0, 0, 0]} scale={5}>
                  <VideoText position={[0, 10, -1]} rotation={[0, zoom ? 0 : -1000, 0]} />
                </group>

                <PresentationControls zoom={0.8} global cursor={false} speed={4} azimuth={[-Math.PI / 2, Math.PI / 2]} polar={[0, 0]} rotation={[0.13, 0.1, 0]} config={{ mass: 3, tension: 80, friction: 26 }}>


                  <Stage adjustCamera={false} contactShadow={{ opacity: 0.2 }} makeDefault shadows="accumulative" preset="portrait" environment="city" intensity={2} >
                    <Model name="P_1" onClick={(e) => (e.stopPropagation(), showSidebar('P_1'))} position={[3.2, 85.5, 17.4]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp1(true);
                      setHovered(true)
                      handleHoverIn('P_1')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp1(false);
                        setHovered(false)
                        handleHoverOut()
                      }} >
                      <animated.meshStandardMaterial {...materialProps} color={hoverColorp1.color} />
                    </Model>

                    <Model name="P_2" onClick={(e) => (e.stopPropagation(), showSidebar('P_2'))} position={[3.2, 75.2, 11]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp2(true);
                      setHovered(true)
                      handleHoverIn('P_2')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp2(false);
                        setHovered(false)
                        handleHoverOut()
                      }}>
                      <animated.meshStandardMaterial {...materialProps} color={hoverColorp2.color} />
                    </Model>
                    <Model name="P_3" onClick={(e) => (e.stopPropagation(), showSidebar('P_3'))} position={[3.2, 63.6, 5.9]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp3(true);
                      setHovered(true)
                      handleHoverIn('P_3')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp3(false);
                        setHovered(false)
                        handleHoverOut()
                      }}  >
                      <animated.meshStandardMaterial {...materialProps} color={hoverColorp3.color} />
                    </Model>
                    <Model name="P_4" onClick={(e) => (e.stopPropagation(), showSidebar('P_4'))} position={[3.2, 52.8, 1.1]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp4(true);
                      setHovered(true)
                      handleHoverIn('P_4')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp4(false);
                        setHovered(false)
                        handleHoverOut()
                      }} > <animated.meshStandardMaterial {...materialProps} color={hoverColorp4.color} />
                    </Model>
                    <Model name="P_5" onClick={(e) => (e.stopPropagation(), showSidebar('P_5'))} position={[3.2, 40.6, -4]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp5(true);
                      setHovered(true)
                      handleHoverIn('P_5')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp5(false);
                        setHovered(false)
                        handleHoverOut()
                      }}  >  <animated.meshStandardMaterial {...materialProps} color={hoverColorp5.color} />
                    </Model>
                    <Model name="P_6" onClick={(e) => (e.stopPropagation(), showSidebar('P_6'))} position={[3.2, 28.8, -9.3]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp6(true);
                      setHovered(true)
                      handleHoverIn('P_6')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp6(false);
                        setHovered(false)
                        handleHoverOut()
                      }} > <animated.meshStandardMaterial {...materialProps} color={hoverColorp6.color} />
                    </Model>
                    <Model name="P_7" onClick={(e) => (e.stopPropagation(), showSidebar('P_7'))} position={[3.2, 16.1, -14.5]} onPointerEnter={(e) => {
                      e.stopPropagation();
                      setHoveredp7(true);
                      setHovered(true)
                      handleHoverIn('P_7')
                    }}
                      onPointerLeave={(e) => {
                        e.stopPropagation();
                        setHoveredp7(false);
                        setHovered(false)
                        handleHoverOut()
                      }} > <animated.meshStandardMaterial {...materialProps} color={hoverColorp7.color} />
                    </Model>

                  </Stage>

                </PresentationControls>
              </Suspense>
              <CameraController zoom={zoom} />
            </Canvas>



            {/* <div className={showHoverContent ? 'title-wrap show-title' : 'title-wrap'}>
              <h2>{activeHoverContent.title}</h2>
            </div> */}
            <div className={startAnimation ? 'title-wrap show-title' : 'title-wrap'}>
              <h2>{activeHoverContent.title}</h2>
            </div>




          </div>

          <div className={`full-load-screen ${zoom === true ? 'load-active' : ''}`}>
            <span className='intro-span' ref={introSpan}> National Martyrs’ Monument </span>
            <div className='big-title-wrap'>
              <h1 className='big-title' ref={bigTitle}>16<sup className='sup-txt'>th</sup> December Victory Day</h1>
              {/* <h1 className='big-title' ref={bigTitle}>National Martyrs’ Monument</h1> */}
            </div>
            <p className='intro-txt' ref={introtxt}>The Smriti Shoudo structure comprises seven pairs of triangular-shaped walls or prisms, with the innermost pair serving as the architecture's highest point. The outermost pair is the smallest in height but has the most significant spread. Each of these seven sets of walls symbolises a crucial period in Bangladesh's history.</p>
            <div className="btn-wrap" >
              <button className='intro-btn' ref={btnWrap} onClick={(e) => (e.stopPropagation(), setZoom(!zoom))}> Click To Exprience</button>
            </div>
          </div>
        </div >
      </div>

    </>
  )
}


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}




function SideDrawer(props) {


  const sideNavTitle = useRef()
  const sideNavContent = useRef()
  useEffect(() => {

    const richTxt = props.activeContent.content
    let p = document.querySelector('.rich-txt')
    p.innerHTML = richTxt



    const sidebarContentDetailTimeline = gsap.timeline({ delay: 1, })
    if (props.show === true) {
      if (sideNavTitle.current && sideNavContent.current) {
        sidebarContentDetailTimeline
          .fromTo(sideNavTitle.current, {
            x: -50,
            opacity: 0
          }, {
            x: 0,
            opacity: 1,
            ease: 'power4.easeInOut',
            duration: 0.5,

          }, 'start')
          .fromTo(sideNavContent.current, { x: -50, opacity: 0, }, {
            x: 0, opacity: 1, ease: 'power4.easeInOut',
            duration: 0.5,
          }, 'start+=0.2')
      }

      // .fromTo('.content img', { x: -50, opacity: 0, }, {
      //   x: 0, opacity: 1, ease: 'power4.easeInOut',
      //   duration: 0.5,
      // }, 'start+=0.3')
    }


  })
  return <>

    <div className="side-bar-holder">
      <div className="side-bar-wrap">
        <div className="close-btn" onClick={(e) => (e.stopPropagation(), props.setActivePillerColor(null), props.setShow(false), props.setName(''))}  >X</div>
        <h1 className='side-nav-title' ref={sideNavTitle}>{props.activeContent.title}</h1>
        <div className="side-nav-body">
          <ul>
            <li className='content' ref={sideNavContent}>
              <div className='rich-txt'></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
}



function OtherText(props) {
  const logoRef = useRef()
  const footerTxt = useRef()

  useEffect(() => {
    if (props.zoom === true) {
      const otherTxt = gsap.timeline({
      })
      otherTxt
        .fromTo(logoRef.current, {
          y: 100,
          autoAlpha: 0
        }, {
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          ease: 'power4.easeInOut',
          duration: 1,
        }, 'start')
        .fromTo(footerTxt.current, { y: -50, autoAlpha: 0 }, {
          y: 0, rotation: 0, autoAlpha: 1, ease: 'power4.easeInOut',
          duration: 0.7,
        }, 'start+=0.8')
    }
  })

  return (
    <>
      <div className="logo" >
        <img ref={logoRef} src="./codesign_logo.svg" alt="" />
      </div>

      <div className="footer-wrapper">
        <div className="made-by-co" ref={footerTxt}>Made By Codesign</div>
      </div>

    </>
  )
}








function VideoText(props) {
  // const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/preview3.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  // useEffect(() => void video.play(), [video])


  return (
    <PresentationControls global cursor={false} speed={0.2} azimuth={[-Math.PI / 15, Math.PI / 15]} polar={[0, 0]} rotation={[0.13, 0.1, 0]}>
      <Text font="/Inter-Bold.woff" fontSize={10} {...props} color={'black'} >
        CODESIGN
        {/* <meshBasicMaterial toneMapped={false} >
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial> */}
        <meshBasicMaterial />
      </Text>
    </PresentationControls>
  )
}





