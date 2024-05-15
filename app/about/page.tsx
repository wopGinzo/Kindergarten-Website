import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function About(){
    return(
        <div className="h-max w-max flex flex-col items-center justify-center" > 
            <h1 className="text-4xl text-center mt-44">
            F.A.Q
            </h1> 
            <div className="w-[100vw] p-10">

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the enrollment process like at Prodigy Kindergarten?</AccordionTrigger>
                    <AccordionContent>
                        The enrollment process at Prodigy Kindergarten involves filling out a digital form online.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How does Prodigy Kindergarten ensure the safety of its students?</AccordionTrigger>
                    <AccordionContent>
                        Prodigy Kindergarten implements strict security measures and adheres to safety protocols to ensure the well-being of its students.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What extracurricular activities are offered at Prodigy Kindergarten?</AccordionTrigger>
                    <AccordionContent>
                        Prodigy Kindergarten offers a variety of extracurricular activities such as sports, arts and crafts, music, and language classes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How does Prodigy Kindergarten communicate with parents?</AccordionTrigger>
                    <AccordionContent>
                        Prodigy Kindergarten communicates with parents through newsletters, emails, and phone calls to keep them informed about events, activities, and their child's progress.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Does Prodigy Kindergarten offer a virtual tour of its facilities?</AccordionTrigger>
                    <AccordionContent>
                        Yes, Prodigy Kindergarten offers a virtual tour of its facilities in 360° to allow parents to explore the premises remotely.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>What is the educational philosophy of Prodigy Kindergarten?</AccordionTrigger>
                    <AccordionContent>
                        Prodigy Kindergarten follows a child-centered educational philosophy that focuses on holistic development and individualized learning experiences.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger>How are absences reported and justified at Prodigy Kindergarten?</AccordionTrigger>
                    <AccordionContent>
                        Parents can report and justify absences online through the Prodigy Kindergarten portal.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                    <AccordionTrigger>Are psychosocial and speech dashboards of children updated regularly at Prodigy Kindergarten?</AccordionTrigger>
                    <AccordionContent>
                        Yes, psychologists and speech therapists have a secure space to update psychosocial and speech dashboards of children at Prodigy Kindergarten.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                    <AccordionTrigger>How does Prodigy Kindergarten manage exam schedules for older children?</AccordionTrigger>
                    <AccordionContent>
                        Prodigy Kindergarten's administrators manage exam schedules for older children through the online portal, ensuring timely and organized assessments.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                    <AccordionTrigger>Can parents make online payments for fees and extracurricular activities at Prodigy Kindergarten?</AccordionTrigger>
                    <AccordionContent>
                        Yes, parents can conveniently make online payments for fees and extracurricular activities through the Prodigy Kindergarten website.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            </div>
        </div>


    )
}