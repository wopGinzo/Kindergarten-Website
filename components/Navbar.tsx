"use client";
import React, { useState } from "react";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Calendar, Handshake, MenuIcon, Search, Telescope } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "../public/logo.svg";
import Image from "next/image";
import Link from "next/link";



export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("absolute inset-x-0 flex md:justify-between items-center w-full z-50 ", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"} className="text-white dark:text-[#395B64]" >
            <svg className="h-12 w-24" viewBox="0 0 1216 792" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M778.005 279.887C782.617 301.421 767.394 343.155 753.717 360.387C734.445 384.668 699.704 397.565 653.005 396.887C623.748 396.404 589.601 376.414 553.968 355.555C533.58 343.62 512.706 331.401 491.982 322.387C567.434 266.731 611.098 221.339 628.505 199.407C631.058 196.19 633.849 195.765 636.432 195.372C639.823 194.855 642.854 194.393 644.513 187.738C680.078 196.815 707.063 208.658 725.47 223.267C727.926 225.216 730.593 227.269 733.378 229.413C751.473 243.341 774.617 261.156 778.005 279.887Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M595.5 682L1181 341L595.5 0L0.5 341L595.5 682ZM653.005 459.887C717.048 462.841 766.271 439.183 799.842 396.887C802.524 393.507 805.435 389.929 808.479 386.185C833.307 355.658 867.067 314.148 859.005 279.887C850.851 243.961 798.029 202.205 760.501 172.539C758.176 170.701 755.91 168.91 753.717 167.169C729.435 147.898 700.404 132.197 666.624 120.067C632.843 107.938 612.067 106.769 604.296 116.56C602.484 118.843 596.618 122.033 589.6 125.849C574.947 133.818 555.273 144.517 557.005 155.387C557.005 155.387 468.193 233.263 340.005 322.387C298.496 351.361 283.565 362.15 276.416 371.158C269.577 379.774 256.713 410.473 257.005 425.387C257.519 451.64 278.976 455.396 291.62 457.608C295.592 458.304 298.694 458.846 300.005 459.887C305.488 464.238 337.324 442.473 442.69 368.43C460.473 377.669 477.881 387.388 494.923 396.904C551.517 428.503 604.085 457.855 653.005 459.887Z" fill="currentColor"/>
                <path d="M23.6455 490.852C21.9441 489.874 20.7182 487.298 19.9677 483.126C19.2597 478.88 19.4162 475.869 20.4372 474.094C21.4582 472.318 24.4517 469.167 29.4177 464.64C44.6764 450.775 56.1706 437.55 63.9003 424.965C62.9167 420.856 62.8717 418.024 63.765 416.471C65.1689 414.03 69.3727 413.396 76.3763 414.569C83.4964 415.71 89.6824 417.791 94.9345 420.812C103.811 425.917 109.61 432.008 112.332 439.086C115.128 446.207 114.675 452.985 110.974 459.42C106.252 467.631 97.9448 472.747 86.053 474.767C74.2351 476.83 61.5215 475.573 47.9122 470.994C37.2458 481.496 30.7197 487.538 28.3338 489.119C26.022 490.742 24.4592 491.32 23.6455 490.852ZM95.0264 450.692C96.3877 448.325 96.6431 445.912 95.7926 443.454C94.9846 440.922 93.1382 438.827 90.2532 437.168C87.3683 435.508 82.5868 434.58 75.9086 434.381C75.8991 437.821 75.2987 440.577 74.1075 442.648C71.7677 446.716 67.2279 452.128 60.4881 458.884C68.6772 460.049 75.9065 459.974 82.1761 458.658C88.4882 457.268 92.7716 454.612 95.0264 450.692Z" fill="currentColor"/>
                <path d="M116.4 493.845L122.946 480.924C125.328 476.781 127.814 475.454 130.403 476.943C131.882 477.794 133.006 479.179 133.773 481.096C134.614 483.057 134.724 485.433 134.102 488.226C137.894 487.453 141.652 487.252 145.376 487.622C149.218 487.961 152.285 488.79 154.578 490.108C159.978 493.214 161.933 496.061 160.444 498.65C159.679 499.982 158.845 500.832 157.945 501.2C157.161 501.536 156.535 501.767 156.069 501.893C155.677 502.061 154.999 502.213 154.036 502.348C153.189 502.451 152.554 502.529 152.13 502.581C149.791 502.712 148.123 502.786 147.128 502.805C142.608 502.962 138.314 503.839 134.245 505.436C130.219 506.96 126.125 509.97 121.964 514.468C115.074 521.826 109.455 527.06 105.107 530.171C100.875 533.25 97.5758 534.108 95.2087 532.747C92.9155 531.428 91.8153 529.319 91.908 526.419C92.0747 523.562 92.7111 521.171 93.8172 519.248C94.9658 517.251 97.3702 514.696 101.03 511.584C104.765 508.514 107.699 505.723 109.833 503.21C112.084 500.665 114.273 497.543 116.4 493.845Z" fill="currentColor"/>
                <path d="M163.825 557.295C168.84 557.817 174.38 556.229 180.445 552.531C186.509 548.832 190.903 544.616 193.625 539.882C196.348 535.147 197.554 531.51 197.244 528.969C192.999 528.989 187.585 531.043 181.001 535.131C174.491 539.263 169.938 543.584 167.343 548.096C164.79 552.535 163.618 555.601 163.825 557.295ZM151.836 540.655C157.154 531.409 165.043 524.281 175.504 519.271C186.038 514.305 194.117 513.438 199.739 516.671C205.361 519.905 208.946 524.625 210.495 530.831C212.087 536.964 211.267 542.841 208.033 548.463C204.843 554.011 200.257 558.904 194.275 563.143C188.294 567.381 181.793 570.041 174.773 571.122C167.795 572.129 161.569 571.059 156.095 567.911C152.027 565.571 149.555 561.738 148.681 556.412C147.806 551.085 148.858 545.833 151.836 540.655Z" fill="currentColor"/>
                <path d="M303.764 535.3C305.539 536.321 306.933 539.289 307.946 544.203C309.002 549.043 308.721 552.868 307.105 555.679C306.296 557.085 301.641 562.184 293.139 570.977C284.636 579.77 279.509 585.091 277.758 586.938C257.163 609.055 245.497 619.327 242.76 617.753C241.207 616.859 240 614.935 239.14 611.979C238.28 609.024 238.361 606.659 239.382 604.883C239.595 604.513 239.802 604.239 240.004 604.06C229.118 605.871 222.048 605.841 218.793 603.969C215.612 602.14 213.484 598.652 212.408 593.505C211.448 588.326 211.777 584.331 213.393 581.521C215.01 578.71 217.167 575.815 219.863 572.838C222.677 569.829 226.003 566.87 229.843 563.959C233.682 561.048 237.595 558.524 241.58 556.387C245.683 554.218 249.83 552.911 254.023 552.468C258.332 551.993 262.077 552.67 265.258 554.5C269.992 557.222 272.493 561.86 272.76 568.412C286.837 553.178 295.461 542.633 298.631 536.778C299.908 534.559 301.618 534.067 303.764 535.3ZM228.34 590.707C230.189 591.77 234.21 591.967 240.404 591.296C246.672 590.668 252.282 588.529 257.235 584.881C257.501 584.246 258.209 582.931 259.358 580.933C260.506 578.936 260.925 576.667 260.615 574.126C260.304 571.585 259.594 569.995 258.485 569.357C256.266 568.081 253.44 568.031 250.007 569.207C246.648 570.425 243.441 572.321 240.386 574.895C233.915 580.328 229.658 584.82 227.616 588.371C227.275 588.963 227.115 589.412 227.136 589.719C227.273 589.995 227.674 590.324 228.34 590.707Z" fill="currentColor"/>
                <path d="M330.496 573.561C331.602 571.638 333.58 570.167 336.43 569.148C339.397 568.098 341.693 568.041 343.321 568.977C345.022 569.955 345.871 573.101 345.867 578.414C345.863 583.728 345.329 587.309 344.265 589.158C343.244 590.934 341.865 591.962 340.129 592.243C338.392 592.524 336.895 592.303 335.638 591.58C333.492 590.346 331.823 587.515 330.628 583.088C329.434 578.66 329.39 575.485 330.496 573.561ZM324.184 588.388C326.773 589.877 328.215 592.676 328.51 596.783C328.88 600.933 328.278 604.377 326.704 607.114C325.895 608.519 321.687 612.842 314.078 620.082C306.585 627.29 299.348 634.055 292.366 640.375C289.819 642.75 287.177 643.15 284.44 641.576C282.813 640.64 281.711 639.218 281.134 637.312C280.674 635.373 280.996 633.443 282.103 631.519C283.251 629.522 286.984 625.172 293.3 618.468C299.733 611.733 305.004 605.905 309.114 600.984C313.34 596.032 316.583 592.532 318.843 590.485C321.22 588.407 323 587.708 324.184 588.388Z" fill="currentColor"/>
                <path d="M383.829 654.585C384.215 656.481 383.898 658.316 382.877 660.091C381.856 661.867 379.861 663.624 376.892 665.362C372.491 668.737 367.694 673.312 362.502 679.087C357.31 684.862 352.884 689.306 349.224 692.418C345.595 695.647 342.159 698.199 338.915 700.074C335.745 701.991 332.26 703.088 328.459 703.363C324.659 703.638 320.983 702.755 317.432 700.713C312.476 697.862 308.974 693.683 306.925 688.173C304.876 682.664 304.533 678.725 305.894 676.358C307.213 674.065 309.054 672.318 311.418 671.118C313.739 669.992 315.417 669.727 316.453 670.323C317.562 670.961 318.258 672.148 318.539 673.885C318.894 675.664 319.095 677.453 319.143 679.253C319.222 681.169 319.624 683.122 320.349 685.114C321.074 687.106 322.287 688.591 323.988 689.57C325.69 690.548 327.881 690.332 330.563 688.921C333.245 687.51 335.7 685.723 337.929 683.559C343.267 678.557 346.902 674.889 348.835 672.555C342.018 672.769 337.019 671.962 333.838 670.132C330.731 668.346 328.677 664.9 327.675 659.796C326.715 654.617 327.108 650.512 328.852 647.479C330.639 644.372 333.665 640.993 337.93 637.343C342.311 633.661 347.115 630.272 352.342 627.174C357.685 624.046 363.311 621.965 369.22 620.934C375.203 619.945 380.229 620.62 384.297 622.96C387.034 624.534 388.96 626.577 390.075 629.089C391.233 631.526 391.596 634.147 391.165 636.951C390.421 641.838 388.603 646.798 385.71 651.828C385.284 652.567 384.657 653.486 383.829 654.585ZM342.819 654.773C342.266 655.735 342.396 656.449 343.21 656.917C345.355 658.151 349.959 658.19 357.022 657.035C364.085 655.88 369.537 653.847 373.376 650.936L374.589 648.828C377.354 644.02 378.59 640.843 378.298 639.296C378.152 638.523 377.709 637.924 376.97 637.499C373.419 635.457 367.35 636.938 358.763 641.941C350.176 646.945 344.861 651.222 342.819 654.773Z" fill="currentColor"/>
                <path d="M460.312 670.368C461.819 668.774 463.571 668.551 465.569 669.7C467.566 670.849 468.877 673.276 469.502 676.982C470.2 680.731 469.635 684.196 467.806 687.377C466.742 689.226 464.396 691.765 460.767 694.994C457.138 698.223 454.539 700.518 452.969 701.879C451.472 703.282 449.356 705.166 446.618 707.529C443.924 709.818 441.409 711.965 439.075 713.97C436.857 715.943 433.818 718.575 429.956 721.867C426.168 725.201 422.661 728.303 419.436 731.173C413.314 736.512 407.546 740.036 402.133 741.747C396.793 743.499 391.498 742.866 386.246 739.845C380.994 736.825 377.105 732.718 374.579 727.524C372.01 722.405 371.535 718.44 373.151 715.629C374.13 713.927 375.954 712.467 378.625 711.246C381.369 710.068 383.26 709.777 384.295 710.373C385.405 711.011 386.321 712.67 387.044 715.35C387.798 718.146 388.611 720.927 389.482 723.692C390.31 726.531 391.427 728.354 392.832 729.162C393.794 729.716 394.826 729.718 395.928 729.171C397.104 728.666 398.09 728.15 398.885 727.623C399.712 727.213 400.709 726.506 401.876 725.504C403.001 724.576 404.046 723.7 405.011 722.877C405.977 722.054 407.207 720.941 408.704 719.538C410.2 718.134 411.516 716.873 412.652 715.754C416.206 712.483 419.321 709.549 421.995 706.953C417.725 708.73 413.742 709.835 410.047 710.27C406.395 710.63 403.459 710.172 401.239 708.896C399.094 707.662 397.33 704.482 395.947 699.355C394.681 694.197 395.175 689.658 397.43 685.737C399.727 681.743 403.641 676.906 409.171 671.227C414.775 665.59 420.361 660.927 425.928 657.238C431.495 653.549 435.277 652.279 437.274 653.428C439.567 654.746 441.138 656.979 441.987 660.125C442.952 663.239 442.903 665.721 441.839 667.57C440.818 669.346 438.234 671.699 434.088 674.63C430.015 677.603 425.693 680.925 421.121 684.596C416.549 688.267 413.305 691.767 411.391 695.095C411.136 695.539 411.193 695.867 411.563 696.08C412.525 696.633 415.58 696.028 420.729 694.264C425.92 692.426 432.332 689.321 439.965 684.95C447.714 680.547 454.497 675.687 460.312 670.368Z" fill="currentColor"/>
                <path d="M656.811 790.842L656.59 790.971C654.968 791.916 652.081 791.623 647.929 790.093C643.734 788.488 640.993 786.58 639.703 784.368C638.371 782.083 634.622 770.737 628.455 750.33C622.362 729.88 617.94 717.295 615.19 712.577C613.471 709.628 613.681 707.531 615.818 706.284C617.588 705.253 620.757 705.776 625.326 707.854C629.853 709.858 633.04 712.445 634.888 715.615C636.005 717.531 637.904 722.993 640.586 731.998C641.947 720.439 643.713 710.421 645.884 701.945C648.012 693.395 650.034 688.562 651.951 687.445C653.942 686.284 656.426 685.972 659.405 686.507C662.341 686.969 664.174 687.826 664.905 689.08C665.593 690.259 665.088 693.714 663.391 699.444C661.694 705.175 659.67 712.379 657.321 721.058C654.972 729.736 653.661 737.316 653.389 743.796C656.698 749.472 663.309 753.274 673.222 755.199C676.201 755.735 679.887 755.957 684.279 755.866C688.628 755.702 692.11 755.746 694.727 755.998C697.374 756.134 699.085 756.866 699.858 758.193C702.05 761.953 700.492 765.38 695.184 768.474C689.876 771.568 682.916 772.76 674.304 772.051C665.65 771.269 657.727 768.183 650.536 762.793C651.799 769.366 652.94 774.035 653.959 776.799C654.935 779.49 655.549 781.305 655.8 782.245C656.125 783.142 656.365 783.891 656.518 784.493C656.629 785.022 656.782 785.624 656.978 786.299C657.175 786.975 657.306 787.54 657.374 787.995C657.398 788.376 657.423 788.757 657.447 789.137C657.392 790.059 657.18 790.627 656.811 790.842Z" fill="currentColor"/>
                <path d="M679.204 682.967C678.087 681.05 677.796 678.602 678.331 675.623C678.897 672.528 679.991 670.507 681.613 669.562C683.309 668.573 686.46 669.404 691.066 672.052C695.672 674.701 698.512 676.947 699.586 678.79C700.617 680.56 700.823 682.267 700.202 683.913C699.581 685.559 698.644 686.747 697.391 687.478C695.253 688.724 691.966 688.763 687.532 687.595C683.097 686.426 680.321 684.884 679.204 682.967ZM688.921 695.823C691.501 694.319 694.646 694.461 698.355 696.25C702.138 697.995 704.825 700.232 706.415 702.96C707.231 704.361 708.885 710.163 711.376 720.366C713.897 730.453 716.161 740.097 718.166 749.299C718.958 752.69 717.989 755.18 715.262 756.77C713.64 757.716 711.858 757.964 709.917 757.515C708.007 756.949 706.494 755.708 705.376 753.791C704.216 751.801 702.301 746.398 699.632 737.583C696.994 728.651 694.564 721.178 692.342 715.163C690.151 709.033 688.73 704.478 688.08 701.498C687.461 698.402 687.741 696.51 688.921 695.823Z" fill="currentColor"/>
                <path d="M742.528 664.575C746.361 662.34 750.726 662.117 755.621 663.906C760.546 665.578 764.148 668.368 766.426 672.275C770.078 678.542 772.871 685.705 774.803 693.764C776.766 701.707 777.606 708.231 777.322 713.335C777.111 718.396 775.753 721.657 773.246 723.119C770.813 724.537 768.587 723.513 766.567 720.048C765.02 717.394 763.121 711.34 760.87 701.886C758.845 694.177 756.995 688.885 755.319 686.01C753.643 683.134 752.436 681.912 751.699 682.341C750.741 682.9 750.062 683.938 749.662 685.455C749.336 686.929 749.093 688.207 748.933 689.288C748.773 690.369 748.631 691.735 748.508 693.388C748.415 694.923 748.353 696.342 748.322 697.644C748.322 698.83 748.309 700.417 748.284 702.408C748.289 704.281 748.313 705.847 748.356 707.107C748.356 708.292 748.38 709.858 748.428 711.806C749.049 728.63 747.406 738.181 743.499 740.458C741.951 741.361 739.224 741.173 735.318 739.894C731.368 738.541 729.028 737.238 728.298 735.985C727.825 735.174 727.331 733.141 726.816 729.885C726.332 726.513 725.903 723.997 725.529 722.339C725.186 720.563 724.688 718.779 724.038 716.985C723.461 715.148 722.746 713.244 721.893 711.272C720.997 709.226 720.285 707.666 719.757 706.591C719.303 705.473 718.505 703.765 717.363 701.467C712.44 691.497 709.899 685.866 709.739 684.576C709.654 683.243 709.906 682.405 710.496 682.061C713.297 680.428 716.676 680.039 720.631 680.894C724.544 681.676 727.058 683.025 728.176 684.941C730.84 689.512 733.485 696.761 736.111 706.688C736.004 695.49 736.357 686.099 737.17 678.513C738.014 670.811 739.8 666.165 742.528 664.575Z" fill="currentColor"/>
                <path d="M788.917 596.049C790.687 595.018 793.954 595.286 798.72 596.854C803.443 598.348 806.622 600.496 808.255 603.297C809.071 604.698 811.176 611.274 814.569 623.026C817.962 634.777 820.024 641.872 820.754 644.311C829.682 673.183 832.782 688.414 830.054 690.004C828.506 690.907 826.236 690.995 823.245 690.269C820.254 689.544 818.243 688.296 817.212 686.527C816.997 686.158 816.862 685.842 816.807 685.578C812.958 695.92 809.412 702.037 806.168 703.928C802.998 705.776 798.913 705.885 793.914 704.256C788.945 702.51 785.644 700.236 784.011 697.435C782.378 694.633 780.942 691.322 779.703 687.501C778.494 683.563 777.583 679.205 776.97 674.426C776.357 669.647 776.116 664.997 776.247 660.476C776.408 655.839 777.34 651.591 779.042 647.734C780.776 643.761 783.228 640.85 786.398 639.002C791.116 636.252 796.383 636.392 802.199 639.422C795.995 619.629 791.144 606.9 787.644 601.236C786.355 599.024 786.779 597.295 788.917 596.049ZM799.419 689.046C801.262 687.971 803.435 684.581 805.937 678.876C808.512 673.127 809.451 667.197 808.752 661.085C808.335 660.538 807.546 659.27 806.386 657.279C805.225 655.289 803.466 653.796 801.108 652.8C798.749 651.804 797.017 651.628 795.911 652.273C793.7 653.562 792.249 655.988 791.56 659.55C790.945 663.07 790.993 666.795 791.704 670.727C793.194 679.044 794.97 684.972 797.033 688.511C797.377 689.1 797.687 689.463 797.963 689.598C798.27 689.617 798.756 689.432 799.419 689.046Z" fill="currentColor"/>
                <path d="M877.637 613.524C879.743 617.136 879.164 621.819 875.9 627.574C872.711 633.285 868.535 637.645 863.375 640.653C858.214 643.661 853.76 645.764 850.013 646.96C850.51 649.338 851.338 651.522 852.499 653.512C853.659 655.503 854.829 656.747 856.008 657.245C857.144 657.669 859.039 657.108 861.693 655.56C867.222 652.337 871.64 649.071 874.946 645.761C878.325 642.409 880.088 640.689 880.236 640.603C883.258 638.841 885.35 638.956 886.51 640.946C888.186 643.821 887.38 647.946 884.092 653.319C880.878 658.65 876.138 663.142 869.871 666.794C863.679 670.404 857.564 671.351 851.526 669.636C845.489 667.92 840.923 664.408 837.829 659.1C834.692 653.718 832.974 647.213 832.675 639.584C832.45 631.912 833.558 624.747 835.999 618.09C838.397 611.358 841.918 606.639 846.562 603.932C851.281 601.181 856.984 600.968 863.672 603.292C870.318 605.542 874.973 608.953 877.637 613.524ZM863.778 619.232C863.348 618.494 861.951 617.877 859.586 617.378C857.222 616.88 855.339 617.039 853.938 617.856C852.611 618.629 851.459 620.634 850.481 623.871C849.46 627.034 848.894 630.723 848.782 634.936C849.489 634.623 850.469 634.101 851.722 633.371C861.822 627.483 865.841 622.77 863.778 619.232Z" fill="currentColor"/>
                <path d="M883.696 607.325L875.748 595.216C873.342 591.087 873.428 588.271 876.009 586.767C877.483 585.907 879.243 585.622 881.288 585.912C883.408 586.158 885.523 587.246 887.636 589.175C888.853 585.503 890.549 582.143 892.725 579.097C894.931 575.935 897.177 573.687 899.462 572.355C904.844 569.218 908.287 568.94 909.791 571.52C910.564 572.847 910.886 573.992 910.757 574.957C910.659 575.804 910.548 576.462 910.425 576.928C910.376 577.352 910.17 578.016 909.807 578.918C909.475 579.705 909.226 580.294 909.06 580.687C908.009 582.781 907.244 584.265 906.764 585.137C904.65 589.135 903.273 593.296 902.633 597.62C901.95 601.87 902.522 606.919 904.351 612.768C907.302 622.406 909.045 629.885 909.577 635.204C910.141 640.407 909.243 643.696 906.884 645.071C904.598 646.404 902.221 646.308 899.753 644.784C897.357 643.216 895.601 641.475 894.484 639.558C893.324 637.567 892.305 634.21 891.428 629.486C890.625 624.72 889.665 620.785 888.548 617.683C887.462 614.464 885.844 611.011 883.696 607.325Z" fill="currentColor"/>
                <path d="M961.072 569.185C962.908 569.794 964.342 570.983 965.373 572.752C966.405 574.522 966.935 577.126 966.965 580.566C967.7 586.064 969.28 592.501 971.704 599.879C974.128 607.257 975.778 613.308 976.655 618.032C977.648 622.786 978.151 627.037 978.162 630.784C978.247 634.488 977.462 638.056 975.809 641.489C974.156 644.922 971.56 647.67 968.021 649.733C963.081 652.612 957.713 653.569 951.915 652.603C946.116 651.637 942.53 649.974 941.155 647.615C939.822 645.329 939.224 642.863 939.36 640.216C939.539 637.642 940.145 636.054 941.177 635.453C942.283 634.808 943.659 634.796 945.305 635.417C947.024 635.995 948.676 636.711 950.261 637.566C951.962 638.451 953.857 639.075 955.945 639.438C958.033 639.801 959.925 639.488 961.621 638.5C963.317 637.511 964.22 635.503 964.332 632.475C964.443 629.447 964.115 626.428 963.349 623.417C961.668 616.298 960.297 611.319 959.235 608.481C956.027 614.499 952.837 618.433 949.667 620.281C946.571 622.085 942.56 622.152 937.634 620.479C932.666 618.733 929.3 616.349 927.538 613.326C925.733 610.23 924.31 605.924 923.267 600.408C922.256 594.775 921.708 588.921 921.624 582.846C921.57 576.654 922.567 570.739 924.614 565.101C926.735 559.42 929.823 555.398 933.878 553.034C936.606 551.444 939.336 550.791 942.069 551.074C944.76 551.284 947.213 552.274 949.43 554.044C953.299 557.122 956.694 561.168 959.617 566.181C960.046 566.918 960.531 567.92 961.072 569.185ZM940.818 604.845C941.377 605.803 942.061 606.046 942.872 605.573C945.01 604.327 947.336 600.354 949.851 593.653C952.365 586.953 953.316 581.213 952.703 576.434L951.479 574.333C948.685 569.541 946.545 566.886 945.059 566.37C944.316 566.112 943.576 566.198 942.839 566.627C939.3 568.69 937.563 574.691 937.627 584.629C937.692 594.568 938.755 601.306 940.818 604.845Z" fill="currentColor"/>
                <path d="M1015.34 539.92C1017.36 540.326 1018.64 541.009 1019.2 541.967C1019.76 542.925 1020.48 545.174 1021.36 548.712C1022.23 552.25 1023.02 554.953 1023.71 556.821C1024.36 558.615 1024.86 560.055 1025.19 561.142C1025.61 562.187 1025.95 563.025 1026.22 563.658C1026.44 564.217 1026.68 564.967 1026.93 565.906C1027.26 566.803 1027.5 567.553 1027.65 568.155C1027.84 568.64 1028.01 569.279 1028.18 570.071C1028.37 570.747 1028.47 571.334 1028.46 571.831C1028.41 572.255 1028.35 572.737 1028.27 573.278C1028.17 574.125 1027.6 574.85 1026.57 575.452C1025.54 576.053 1023.65 575.773 1020.9 574.611C1018.22 573.407 1015.65 571.545 1013.2 569.026C1010.39 580.142 1006.63 587.076 1001.91 589.826C998.742 591.674 994.304 591.94 988.598 590.624C982.849 589.234 978.965 586.806 976.945 583.341C974.883 579.803 973.545 573.866 972.934 565.53C972.322 557.195 973.133 548.672 975.365 539.963C977.671 531.211 981.515 525.266 986.897 522.129C989.993 520.324 994.622 520.046 1000.78 521.295C1006.94 522.544 1010.9 524.68 1012.67 527.702C1014.38 530.651 1015.28 534.724 1015.34 539.92ZM993.348 576.151C996.297 574.432 999.044 570.164 1001.59 563.346C1004.16 556.412 1004.26 549.542 1001.87 542.735C1001.43 541.808 1001.76 540.926 1002.85 540.091C1000.18 536.018 998.253 534.325 997.074 535.013C994.125 536.732 991.925 540.582 990.473 546.565C989.096 552.504 988.495 558.336 988.671 564.061C988.921 569.743 989.648 573.616 990.851 575.68C991.195 576.27 991.505 576.632 991.781 576.767C992.088 576.786 992.611 576.58 993.348 576.151Z" fill="currentColor"/>
                <path d="M1023.42 525.878L1015.47 513.769C1013.07 509.64 1013.15 506.824 1015.73 505.32C1017.21 504.46 1018.97 504.175 1021.01 504.465C1023.13 504.711 1025.25 505.799 1027.36 507.728C1028.58 504.056 1030.27 500.696 1032.45 497.65C1034.66 494.488 1036.9 492.24 1039.19 490.908C1044.57 487.771 1048.01 487.492 1049.52 490.073C1050.29 491.4 1050.61 492.545 1050.48 493.51C1050.38 494.357 1050.27 495.015 1050.15 495.481C1050.1 495.905 1049.89 496.568 1049.53 497.471C1049.2 498.257 1048.95 498.847 1048.78 499.24C1047.73 501.334 1046.97 502.817 1046.49 503.69C1044.37 507.688 1043 511.849 1042.36 516.173C1041.67 520.423 1042.25 525.472 1044.08 531.32C1047.03 540.959 1048.77 548.438 1049.3 553.757C1049.87 558.96 1048.97 562.249 1046.61 563.624C1044.32 564.957 1041.95 564.861 1039.48 563.336C1037.08 561.769 1035.33 560.027 1034.21 558.111C1033.05 556.12 1032.03 552.763 1031.15 548.039C1030.35 543.272 1029.39 539.338 1028.27 536.236C1027.19 533.017 1025.57 529.564 1023.42 525.878Z" fill="currentColor"/>
                <path d="M1079.5 485.778C1080.07 488.112 1080.82 491.43 1081.75 495.73C1082.71 499.913 1083.91 505.19 1085.35 511.56C1086.86 517.887 1087.73 521.235 1087.94 521.603C1088.11 521.898 1088.79 521.702 1089.97 521.014C1091.22 520.284 1093.66 517.775 1097.29 513.489C1100.87 509.129 1103.07 506.713 1103.88 506.24C1105.72 505.166 1107.37 505.882 1108.83 508.388C1110.29 510.895 1109.59 515.357 1106.71 521.775C1103.79 528.119 1099.64 532.86 1094.26 535.997C1091.9 537.372 1088.35 537.715 1083.6 537.026C1078.85 536.336 1075.7 534.665 1074.15 532.011C1072.87 529.799 1071.26 524.51 1069.35 516.143C1067.47 507.66 1066.16 501.855 1065.42 498.728C1063.02 501.215 1061.08 502.888 1059.61 503.748C1058.13 504.607 1056 504.514 1053.22 503.469C1050.4 502.35 1048.45 500.87 1047.37 499.026C1046 496.667 1050.55 491.346 1061.03 483.064C1058.44 475.391 1055.68 469.048 1052.75 464.035C1051.47 461.823 1051.93 460.073 1054.14 458.783C1056.05 457.666 1059.18 457.428 1063.5 458.068C1067.85 458.591 1070.7 459.996 1072.03 462.281C1073.32 464.493 1074.67 467.905 1076.07 472.519C1079.52 470.308 1082.17 468.666 1084.02 467.592C1089.54 464.369 1093.04 464.011 1094.5 466.517C1095.45 468.139 1094.64 470.485 1092.08 473.556C1089.56 476.509 1085.37 480.584 1079.5 485.778Z" fill="currentColor"/>
                <path d="M1151.36 453.966C1153.47 457.578 1152.89 462.262 1149.63 468.016C1146.44 473.728 1142.26 478.087 1137.1 481.095C1131.94 484.104 1127.49 486.206 1123.74 487.403C1124.24 489.78 1125.06 491.964 1126.22 493.954C1127.38 495.945 1128.55 497.189 1129.73 497.687C1130.87 498.111 1132.76 497.55 1135.42 496.003C1140.95 492.78 1145.37 489.513 1148.67 486.203C1152.05 482.851 1153.81 481.131 1153.96 481.046C1156.98 479.284 1159.08 479.398 1160.24 481.388C1161.91 484.264 1161.11 488.388 1157.82 493.762C1154.6 499.092 1149.86 503.584 1143.6 507.237C1137.4 510.846 1131.29 511.794 1125.25 510.078C1119.21 508.362 1114.65 504.85 1111.55 499.542C1108.42 494.161 1106.7 487.655 1106.4 480.026C1106.18 472.354 1107.28 465.189 1109.72 458.532C1112.12 451.801 1115.64 447.081 1120.29 444.374C1125.01 441.624 1130.71 441.41 1137.4 443.734C1144.04 445.984 1148.7 449.395 1151.36 453.966ZM1137.5 459.674C1137.07 458.937 1135.68 458.319 1133.31 457.821C1130.95 457.322 1129.06 457.481 1127.66 458.298C1126.34 459.072 1125.18 461.077 1124.21 464.313C1123.19 467.476 1122.62 471.165 1122.51 475.378C1123.21 475.065 1124.19 474.544 1125.45 473.813C1135.55 467.926 1139.57 463.213 1137.5 459.674Z" fill="currentColor"/>
                <path d="M1181.14 408.902C1184.97 406.668 1189.34 406.445 1194.23 408.234C1199.16 409.906 1202.76 412.696 1205.04 416.603C1208.69 422.87 1211.48 430.033 1213.42 438.092C1215.38 446.035 1216.22 452.558 1215.93 457.663C1215.72 462.724 1214.37 465.985 1211.86 467.446C1209.43 468.864 1207.2 467.841 1205.18 464.376C1203.63 461.722 1201.73 455.668 1199.48 446.214C1197.46 438.505 1195.61 433.212 1193.93 430.337C1192.26 427.462 1191.05 426.239 1190.31 426.669C1189.35 427.228 1188.67 428.266 1188.27 429.783C1187.95 431.257 1187.71 432.534 1187.55 433.615C1187.39 434.696 1187.24 436.063 1187.12 437.715C1187.03 439.251 1186.97 440.67 1186.93 441.972C1186.93 443.157 1186.92 444.745 1186.9 446.735C1186.9 448.609 1186.93 450.175 1186.97 451.434C1186.97 452.62 1186.99 454.186 1187.04 456.133C1187.66 472.958 1186.02 482.509 1182.11 484.786C1180.56 485.689 1177.84 485.5 1173.93 484.222C1169.98 482.869 1167.64 481.566 1166.91 480.313C1166.44 479.502 1165.94 477.469 1165.43 474.213C1164.94 470.841 1164.52 468.325 1164.14 466.667C1163.8 464.891 1163.3 463.107 1162.65 461.313C1162.07 459.476 1161.36 457.572 1160.51 455.6C1159.61 453.554 1158.9 451.994 1158.37 450.919C1157.92 449.8 1157.12 448.093 1155.98 445.795C1151.05 435.824 1148.51 430.194 1148.35 428.904C1148.27 427.571 1148.52 426.733 1149.11 426.389C1151.91 424.756 1155.29 424.367 1159.24 425.222C1163.16 426.003 1165.67 427.352 1166.79 429.269C1169.45 433.84 1172.1 441.089 1174.72 451.016C1174.62 439.818 1174.97 430.426 1175.78 422.841C1176.63 415.139 1178.41 410.492 1181.14 408.902Z" fill="currentColor"/>
            </svg>
          
        </Link>  
        <div className="flex w-full md:w-1/2 md:gap-2">

            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="discovery" title="Discovery"
             titleClassname="" itemIcon={<Telescope />}>
            <div className="flex flex-col space-y-4 text-sm">
              <ProductItem title="VR View" href="/discovery" src="/children/childrenbg.jpg" description="360' View of the entire facility." />
            </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="events" title="Events"
             titleClassname="" itemIcon={<Calendar />}>
              <div className="flex flex-col text-sm gap-10 p-4">
                <HoveredLink href="/events/upcoming">
                  <span className="hidden md:block">
                    Upcoming Events
                  </span>
                </HoveredLink>
                <HoveredLink href="/events">
                  <span className="hidden md:block">
                    Events History
                  </span>
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="services" title="Services"
             titleClassname="" itemIcon={<Handshake />}>
              <div className=" flex flex-col text-sm gap-10 p-4">
                <ProductItem title="Plans" href="/services" src="/plans/kindergarten-3.jpg" description="Age based education plans." />
                <ProductItem title="Schedules" href="/services" src="/plans/half-day.jpg" description="Hourly schedule options." />
              </div>
            </MenuItem>


            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md " link="about" title="About Us"
             titleClassname="" itemIcon={<Search />}>

            </MenuItem>
            <MenuItem setActive={setActive} active={active} itemClassname=" p-4 relative rounded-md fixed right-5 z-50" title="Menu"
             titleClassname="md:hidden" itemIcon={<MenuIcon />}>
            <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Menu</HoveredLink>
                <HoveredLink href="/">Pre-Register</HoveredLink>
                <HoveredLink href="/">Login</HoveredLink>
                <ThemeToggle />
            </div>
            </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
