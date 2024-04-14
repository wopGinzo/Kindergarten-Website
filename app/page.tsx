import Image from "next/image";

export default function Home() {
  
  return (
    <main>

    <div className="w-full h-[100vh]
                    bg-cover bg-no-repeat bg-center bg-[url('../public/background.png')] flex 
                    justify-center items-end flex-col">

      <div className="block max-w-screen-sm text-center p-10">
        <h1 className="text-5xl p-10 text-primary-foreground">
          Welcome
        </h1>
        <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim amet culpa odio. Labore rerum incidunt
         perferendis animi voluptates eius repellat explicabo necessitatibus nostrum soluta nemo, quod atque,
          quam officiis quisquam!
        </span>
        
      </div>
    </div>
    <div className="bg-[#EECFD4]
    w-full h-[100vh]">
      
    </div>

                      </main>
    
  );
}
