"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { CardContent, CardTitle } from "@/components/ui/card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import ImageScroll from "@/components/children-galery";
import { LayoutGrid, Card } from "@/components/ui/layout-grid";
import ScrollText from "@/components/ui/scroll-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useScroll } from "framer-motion";
import Image from "next/image";
import ChildrenGalery from "@/components/children-galery";
import PopupText from "@/components/ui/popup-text";
import Footer from "@/components/footer";
import DrawingSketch from "@/components/drawing-sketch";
import { Butterfly_Kids } from "next/font/google";
import { Coming_Soon } from "next/font/google";
import ScrollScaleText from "@/components/ui/scroll-scale-text";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const butterflyKids = Butterfly_Kids({
  weight:"400",
  subsets: ['latin']
})
const comingSoon = Coming_Soon({
  weight:"400",
  subsets: ['latin']
})

export default function Home() {
  
  const { user, login, logout, token } = useAuth();


    const testimonialCards : Card[] = [
    {
    id: 1,
    content: <span className="flex flex-col text-[#F8F0DF]">
      <h1 className="text-xl">Mohamed Dib</h1> "Prodigy Kindergarten has been a wonderful experience for my child.
      The caring staff and engaging activities have helped my child grow and learn in a nurturing environment. I'm
      excited about the new digital web app and how it will enhance my involvement in my child's education."
    </span>,
    className: 'flex',
    thumbnail: "/testimonials/test1.jpg"
    },
    {
    id: 2,
    content: <span className="flex flex-col text-[#F8F0DF]">
      <h1 className="text-xl">Zahra Mekki</h1> "I am thrilled with the level of care and education my child receives at
      Prodigy Kindergarten. The new digital web app is a fantastic addition, making it even easier to stay connected
      with my child's progress. I highly recommend Prodigy to all parents."
    </span>,
    className: 'flex',
    thumbnail: "/testimonials/test2.jpg"
    },
    {
    id: 3,
    content: <span className="flex flex-col text-[#F8F0DF]">
      <h1 className="text-xl">Ahmed Benoui</h1> "Prodigy Kindergarten has exceeded my expectations. The staff is
      dedicated, and the new digital web app is a game-changer. I can now track my child's development and communicate
      with the teachers more effectively. I'm excited for the future of Prodigy."
    </span>,
    className: 'flex',
    thumbnail: "/testimonials/test3.jpg"
    },
    {
    id: 4,
    content: <span className="flex flex-col text-[#F8F0DF]">
      <h1 className="text-xl">Fatima Kaddour</h1> "The care and education my child receives at Prodigy Kindergarten are
      top-notch. The new digital web app is a fantastic tool that allows me to be more involved in my child's learning
      journey. I couldn't be happier with Prodigy."
    </span>,
    className: 'flex',
    thumbnail: "/testimonials/test4.jpg"
    },
    {
    id: 5,
    content: <span className="flex flex-col text-[#F8F0DF]">
      <h1 className="text-xl">Amina Zaidi</h1> "Prodigy Kindergarten has been a blessing for my child. The staff is
      amazing, and the new digital web app is incredibly helpful. I can now follow my child's progress and communicate
      with the teachers more easily. I'm excited for the new developments at Prodigy."
    </span>,
    className: 'flex',
    thumbnail: "/testimonials/test5.jpg"
    },
    {
    id: 6,
    content: <span className="flex flex-col text-[#F8F0DF]">
      <h1 className="text-xl">Karim Sadiq</h1> "I am extremely pleased with Prodigy Kindergarten. The staff is caring,
      and the new digital web app is a fantastic addition. It allows me to be more involved in my child's education, and
      I'm excited for the future of Prodigy."
    </span>,
    className: 'flex',
    thumbnail: "/testimonials/test6.jpg"
    },
    ];


    const workers = [  
    {
      id: 1,
      name: "Samira Kader",
      designation: "English Teacher",
      image: "/workers/samira-kader.jpg",
    },
    {
      id: 2,
      name: "Youssef Benyamina",
      designation: "Math Teacher",
      image: "/workers/youssef-benyamina.jpg",
    },
    {
      id: 3,
      name: "Leila Boualem",
      designation: "Science Teacher",
      image: "/workers/leila-boualem.jpg",
    },
    {
      id: 4,
      name: "Omar Chikhi",
      designation: "Psychologist",
      image: "/workers/omar-chikhi.jpg",
    },
    {
      id: 5,
      name: "Sarah Benkherouf",
      designation: "Speech Therapist",
      image: "/workers/sarah-benkherouf.jpg",
    },
    {
      id: 6,
      name: "Yacine Azzouz",
      designation: "Quran Teacher",
      image: "/workers/yacine-azzouz.jpg",
    },
    ];
  function paragraphToArray(paragraph: string): any[] {
    const mappedParagraph:any= paragraph.split(" ").map((word) => {
      return {
        text: word,
      };
    });
    return (mappedParagraph);
  }

  return (
    <main>

    <div className="w-full h-[100vh] bg-cover bg-no-repeat bg-left md:bg-center bg-[url('../public/backgroundLight.jpg')] dark:bg-[url('../public/backgroundDark.jpg')] 
    flex justify-center items-end flex-col bg-parallax bg-fixed relative">
      {/* <div className="absolute inset-0 bg-black opacity-0 dark:opacity-60 w-full h-full" /> */}
      <div className="w-2/3 justify-self-center text-center flex flex-col items-center justify-center p-10 text-[#373737] dark:text-[#F8F0DF] z-10 ">
        <h1 className={`${butterflyKids.className} text-xl md:text-5xl p-10`} >
          Welcome to
        </h1>
        <h1 className={`${comingSoon.className} text-2xl md:text-7xl p-10 `} >
          Prodigy Kindergarten
        </h1>
        <div className={`${comingSoon.className} text-xs md:text-base w-2/3 flex flex-col gap-y-8`} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim amet culpa odio. Labore rerum incidunt
          perferendis animi voluptates eius repellat explicabo necessitatibus nostrum soluta nemo, quod atque,
            quam officiis quisquam!
            {!user? (

              <Link href={"/preregister"}>
            <button type="reset" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Pre-Register!
            </button>
          </Link>
            ):null}
      
        </div>
        
      </div>
    </div>
    <div className="bg-[#FFE6F7] dark:bg-[#2C3333]
    w-full h-[100vh] flex flex-col relative">
      {/* <div className="absolute h-full w-full bg-black opacity-0 dark:opacity-60" /> */}
      <div className="flex justify-around text-[#F8F0DF] items-center">
        <h1 className={`${butterflyKids.className} p-10 font-bold  text-2xl md:text-8xl z-50 text-[#937DC2] dark:text-[#F8F0DF]`}> <TextGenerateEffect words="Testimonials" /></h1>
        <span className="max-w-prose pb-10 sm:p-10 self-place-end text-center text-xs xl:text-base z-50 text-[#373737] dark:text-[#F8F0DF]">
          <TextGenerateEffect words={`Prodigy Kindergarten enjoys a reputation as a
            leader in early childhood education, attracting families who value quality, sophistication, and innovation.`} />
        </span>
        
      </div>
      

      {/* <TypewriterEffectSmooth words={paragraphToArray("(Click on each photo to learn more!)")} /> */}
      <div className="flex min-h-[350px] w-full justify-center p-2 sm:p-10 items-center">
        
        <div className="h-screen py-20 w-full">
          <LayoutGrid cards={testimonialCards} />
        </div>
      </div>
      
    </div>
    <div className="bg-gradient-to-b from-[#FFE6F7] to-[#D67BFF] dark:from-[#2C3333] dark:to-[#2C4B53]
    w-full h-[100vh] flex flex-col">
      <h1 className={`${butterflyKids.className} text-4xl md:text-8xl pt-10 text-center`}> Our Staff</h1>
      <ContainerScroll titleComponent={<></>
      }>
        <div className="flex flex-wrap items-center h-full">
          <span className="place-self-center w-full text-center flex items-center">
            <TypewriterEffectSmooth className="place-self-end w-full justify-center items-top hidden sm:flex"
              words={paragraphToArray("Here are our Employees of the Year !")} />
            <h1 className="text-center text-lg p-10 pb-0 sm:hidden">Here are our Employees of the Year !</h1>
          </span>
          <div className="place-self-end p-3 flex flex-wrap sm:flex-row items-center justify-center w-full h-full">
            <AnimatedTooltip items={workers} />
          </div>
        </div>
      </ContainerScroll>
      
    </div>
    <div className="h-[100vh] w-full relative
                    bg-cover bg-no-repeat bg-left bg-[url('/children/children7.jpg')] flex 
                    justify-center items-end flex-col bg-parallax bg-fixed overflow-hidden">
      <div className="absolute place-self-start flex justify-center items-center h-[100vh] w-[100vw]">
        <h1 className={`text-6xl sm:text-9xl text-transparent absolute font-bold top-0 md:left-0 text-center z-0 bg-[#D67BFF] dark:bg-[#395B64] bg-opacity-80 
        backdrop-blur-xl 
        w-[100vw] md:w-[50vw] h-[50vh] md:h-[100vh] flex justify-center items-center`}>
          {/* <span className="bg-[url('/children/children2.jpg')] w-[100vw] h-[100vh] z-10  bg-fixed bg-cover flex justify-center items-center
          absolute bg-clip-text text-transparent bg-left">
            A time <br/> for fun!
          </span> */}
          <ScrollText text="A time <br/> for fun!" className="bg-[url('/children/children7.jpg')] w-[100vw] h-[100vh] z-10  bg-fixed bg-cover 
          flex justify-center items-center absolute bg-clip-text text-transparent bg-left" from={-500} to={0}
                                        start="0 1" end="center"/>
        </h1>
      </div>
                      
    </div>



    <div className="h-[100vh] w-full relative
                    bg-cover bg-no-repeat bg-left bg-[url('/children/children5.jpg')] flex 
                    justify-center items-end flex-col bg-parallax bg-fixed overflow-hidden">
      <div className="absolute place-self-start flex justify-center items-center h-[100vh] w-[100vw]">
        <h1 className="text-5xl sm:text-8xl text-transparent absolute font-bold top-0 md:right-0 text-center bg-[#D67BFF] dark:bg-[#395B64] w-[100vw] md:w-[50vw] h-[50vh] md:h-[100vh]
        flex justify-center items-center">
          {/* <span className="bg-[url('/children/children5.jpg')] w-[100vw] h-[100vh] bg-fixed bg-cover flex justify-center items-center
          absolute bg-clip-text text-transparent bg-left">
            And a time <br/> for success!
          </span> */}
          <ScrollText text="And a time <br/> for success!" className="bg-[url('/children/children5.jpg')] w-[100vw] h-[100vh] bg-fixed bg-cover flex justify-center items-center
          absolute bg-clip-text text-transparent bg-left" from={500} to={0}
                                        start="0 1" end="center"/>
        </h1>
      </div>
                      
    </div>




    <div className="w-full h-[175vh] relative
                    bg-cover bg-no-repeat bg-bottom bg-[url('../public/bondBlurred.jpg')] flex 
                    justify-start items-end flex-col bg-parallax  overflow-hidden">
                            {/* <DrawingSketch /> */}
      <div className="absolute h-full w-full bg-black opacity-0 dark:opacity-60" />

      <div className={`flex h-[100vh] mt-20 w-full flex-col items-center ${comingSoon.className}`}>
        <h1 className="text-6xl bg-black/10 backdrop-blur-sm rounded-md p-4 text-[#F8F0DF]"> BE</h1>
        <ScrollScaleText text="TOGETHER" className="text-9xl text-[#F8F0DF] bg-black/10 backdrop-blur-sm rounded-full p-10" from={"100px"} to={"30px"}
                                        start="0 1" end="center"/>
        <h1 className="text-6xl bg-black/10 backdrop-blur-sm rounded-md p-4 text-[#F8F0DF]"> W/ YOUR CHILD</h1>
      </div>
      <div className="flex h-[50vh] w-full justify-around items-start ">
        <PopupText text="Watch your child real-time on the app!" 
            className="rounded-md shadow-2xl bg-gradient-to-r dark:from-[#79B4B7] from-[#FFABE1] to-[#D67BFF] dark:to-[#2C4B53] text-center text-xl m-2 md:m-10 p-3 md:p-10 
            dark:text-[#F8F0DF]  z-40" />
        <PopupText text="Join your child in his events and activities." 
          className="rounded-md shadow-2xl bg-gradient-to-l dark:from-[#79B4B7] from-[#FFABE1] to-[#D67BFF] dark:to-[#2C4B53] text-center text-xl m-2 md:m-10 p-3 md:p-10 
          dark:text-[#F8F0DF] z-40" />
      </div>
      <div className="flex h-[25vh] w-1/2 self-center rounded-md m-10 justify-center gap-16 items-center bg-black/50 backdrop-blur-sm text-[#F8F0DF]">
          <h1 className="text-6xl hover:scale-125 transition-all mb-2">Join us now!</h1>
          <Link href={"/preregister"}>
            <button type="reset" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Pre-Register!
            </button>
          </Link>
      
      </div>


{/* 
      <div className="absolute flex justify-center items-center h-[100vh] w-[100vw]">

        <h1 className="text-6xl shadow-2xl rounded-md text-transparent absolute font-bold text-center place-self-center bg-[#45062E] w-80 h-36 flex justify-center items-center">
          <span className="bg-[url('../public/bond.jpg')] w-[100vw] h-[100vh] bg-fixed bg-cover flex justify-center items-center
          absolute bg-clip-text text-transparent bg-bottom">
            Bond with {<br/>} your child.
          </span>
        </h1>
      </div>
      <div className="h-full w-full flex md:items-center justify-between z-10">
        <div className="h-full w-full md:w-4/12  text-center flex items-end justify-center">
          <PopupText className="rounded-md shadow-2xl bg-[#C8E4B2] text-center text-xl m-2 md:m-10 p-3 md:p-10 text-black z-30" text="Watch your child real-time on the app!" />

        </div>
        <div className="h-full w-full md:w-4/12  text-center">
          <PopupText text="Join your child in his events and activities." 
          className="rounded-md shadow-2xl bg-[#C8E4B2] text-center text-xl m-2 md:m-10 p-3 md:p-10 text-black z-40" />
        </div>
      </div>
       */}
    </div>



    {/* <div className="w-full h-[100vh] flex flex-col">
      <ChildrenGalery className="shadow-2xl rounded-md w-72 absolute  z-30" />
    </div> */}
    


    {/* <div className="w-full h-[100vh] flex bg-[url('../public/bond.jpg')] bg-cover bg-bottom">
    <DrawingSketch />

    </div> */}

    </main>
    
  );
}
