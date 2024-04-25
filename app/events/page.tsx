import ParallaxImages from "@/components/ui/parallax-galery";

export default function Events(){
    const events = [
        {
            title: "Event #01",
            imgURL: "/events/event1.jpg",
            description: "Ahmed's 8th birthday party. Friends and family gathered to celebrate Ahmed's special day, making it a memorable occasion for all."
          },
          {
            title: "Event #02",
            imgURL: "/events/event2.jpg",
            description: "Yearly kids marathon! With 1km, 3km, and 5km races, there was something for everyone. The local park was filled with cheering and excitement as kids of all ages crossed the finish line. Proceeds from the event went towards after-school programs for underprivileged kids, making it a fun and meaningful event for all."
          },
          {
            title: "Event #03",
            imgURL: "/events/event3.jpg",
            description: "The kids chess competition was a thrilling event! With prizes for the top three winners. Kids of all ages participated, showcasing their strategic thinking skills, making it a fun and educational event for all."
          }
        ];
    
    return(
        <div className="bg-[#C8E4B2] dark:bg-[#505B47] ">
            <ParallaxImages images={events} />

        </div>
    )
}