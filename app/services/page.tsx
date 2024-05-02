import { AnimatedCard } from "@/components/animated-card";

export default function Discovery(){
    
    const plans = [
        {
            title: 'Toddler Plan',
            subtitle: 'For children aged 3-4',
            img: '/plans/kindergarten-3.jpg',
            imgDescription: [
                'Nurturing and stimulating environment',
                'Experienced teachers',
                'Cognitive, social, emotional, and physical development',
                'Play-based activities, music, art, and movement'
            ],
            url: '/',
            note: '10,000 DA/Trimester'
        },
        {
            title: 'Preschool Plan',
            subtitle: 'For children aged 4-5',
            img: '/plans/kindergarten-4.jpg',
            imgDescription: [
                'Preparing for kindergarten',
                'Developing pre-reading, pre-writing, and math skills',
                'Fostering social and emotional growth',
                'Hands-on activities, active learning'
            ],
            url: '/',
            note: '8,000 DA/Trimester'
        },
        {
            title: 'Kindergarten Plan',
            subtitle: 'For children aged 5-6',
            img: '/plans/kindergarten-5.jpg',
            imgDescription: [
                'Full-day program',
                'Structured learning environment',
                'Curriculum aligns with state standards',
                'Developing literacy, math, science, and social studies skills',
                'Critical thinking, problem-solving, and creativity',
                'Supportive and nurturing environment'
            ],
            url: '/',
            note: '10,000 DA/Trimester'
        }
    ];
    
    const schedules = [
        {
            title: 'Half Day Schedule',
            subtitle: 'For parents who want to spend more time with their children in the afternoon',
            img: '/plans/half-day.jpg',
            imgDescription: [
                '8:00 AM - 12:00 PM',
                'Nurturing and stimulating environment',
                'Experienced teachers',
                'Cognitive, social, emotional, and physical development'
            ],
            url: '/',
            note: '50% Plan-price'
        },
        {
            title: 'Full Day Schedule',
            subtitle: 'For parents who need full-time care for their children',
            img: '/plans/full-day.jpg',
            imgDescription: [
                '8:00 AM - 3:00 PM',
                'Structured learning environment',
                'Curriculum aligned with state standards',
                'Developing literacy, math, science, and social studies skills'
            ],
            url: '/',
            note: 'Full Plan Price'
        }
    ]

    return(
        <>
        <div className="h-[130vh] w-full flex flex-col justify-center items-center bg-[#FFE6F7] dark:bg-[#2C3333]" > 
            <h1 className="text-4xl mt-32">
                We have got plans for each age group!
            </h1> 
            <div className="flex justify-around items-start">
                {plans.map((plan)=>(
                    <AnimatedCard className="w-1/4" title={plan.title} subtitle={plan.subtitle} img={plan.img} imgDescription={plan.imgDescription} url={plan.url} note={plan.note} />
                ) )}
            </div>

        </div>
        <div className="h-[130vh] w-full flex flex-col justify-center items-center bg-[#FFE6F7] dark:bg-[#2C3333]" > 
            <h1 className="text-4xl">
                Suitable schedule options for you and your child!
            </h1> 
            <div className="flex justify-around items-start">
                {schedules.map((schedule)=>(
                    <AnimatedCard className="w-1/3" title={schedule.title} subtitle={schedule.subtitle} img={schedule.img} imgDescription={schedule.imgDescription} url={schedule.url} note={schedule.note} />
                ) )}
            </div>

        </div>


                </>
    )
}