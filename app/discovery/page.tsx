"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";

export default function Discovery() {
    const mapRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframeDoc = mapRef.current?.contentDocument;
        if (iframeDoc) {
            console.log("retrieved iframe content");
            
            const mapDiv = iframeDoc.getElementById("mapDiv");
            if (mapDiv) {
                console.log("Found div with id 'mapDiv'");
            }

            // const divsToDelete = iframeDoc.querySelectorAll('div[jstcache="33"], div[jstcache="29"]');
            // divsToDelete?.forEach(div => {
            //     console.log("deleting div")
            //     div.parentNode?.removeChild(div);
            // });

            // const profileUrlDiv = iframeDoc.querySelector('div[jstcache="26"].gm-iv-profile-url');
            // if (profileUrlDiv) {
            //     console.log(`found div`);
            //     profileUrlDiv.textContent = "Your custom text here";
            // }
        }
    }, []);

    return (
        <div className="h-[100vh] w-full flex items-center justify-center bg-[#FFE6F7] dark:bg-[#2C3333]">
            <h1 className="text-4xl"></h1>
            <iframe ref={mapRef} src="https://www.google.com/maps/embed?pb=!4v1714171175188!6m8!1m7!1sCAoSLEFGMVFpcFBZM2ZoTzRUVUNmakJaWHV2UzhvTFM4RVduYm10Y1ViekdienI3!2m2!1d53.30169102!2d-2.70608139!3f235.51044505285265!4f-24.907386626800076!5f0.4000000000000002" width="1200" height="600" title="Map"></iframe>
        </div>
    );
}
