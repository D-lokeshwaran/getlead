import DashboardLayout from './layout';

export default function Dashboard() {

    return (
        <DashboardLayout>
            <div className="layout-content-container flex flex-col  flex-1">
                {/* <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3"> */}
                    <div className="container p-3">
                        <p className="text-[#1C160C] text-4xl font-black leading-tight tracking-[-0.033em]">Leads</p>
                    </div>
                    {/* </div>
                </div> */}
                <div className="flex justify-between gap-2 py-3 px-1">
                    <div className="flex gap-2">
                        <button className="p-2 text-[#1C160C] hover:bg-[#F4EFE6] hover:rounded-full">
                            <div className="text-[#1C160C]" data-icon="FilePlus" data-size="24px" data-weight="regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                    <path
                                            d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-40-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                        <button className="p-2 text-[#1C160C]">
                            <div className="text-[#1C160C]" data-icon="SmileyBlank" data-size="24px" data-weight="regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                    <path
                                            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM104,108A12,12,0,1,1,92,96,12,12,0,0,1,104,108Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                        <button className="p-2 text-[#1C160C]">
                            <div className="text-[#1C160C]" data-icon="Share" data-size="24px" data-weight="regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                    <path
                                            d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="pb-3">
                    <div className="flex border-b border-[#E9DFCE] px-4 gap-8">
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[transparent] text-[#A18249] pb-[13px] pt-4" href="#">
                            <p className="text-[#A18249] text-sm font-bold leading-normal tracking-[0.015em]">All</p>
                        </a>
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#019863] border-b-transparent text-[#A18249] pb-[13px] pt-4" href="#">
                            <p className="text-[#1C160C] text-sm font-bold leading-normal tracking-[0.015em]">Recently viewed</p>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    <div className="flex flex-col gap-3 pb-3">
                        <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/877d2f8d-7ca4-4e5a-a573-926b3337f88d.png")'}}
                        ></div>
                        <div>
                            <p className="text-[#1C160C] text-base font-medium leading-normal">React Training Topics</p>
                            <p className="text-[#A18249] text-sm font-normal leading-normal">Created by you</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3">
                        <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/bf1adec4-a374-4fdc-98cc-081e114e14be.png")'}}
                        ></div>
                        <div>
                            <p className="text-[#1C160C] text-base font-medium leading-normal">React Training Topics</p>
                            <p className="text-[#A18249] text-sm font-normal leading-normal">Created by you</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3">
                        <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/43263f93-5ad3-4faf-9d96-76ce45c02471.png")'}}
                        ></div>
                        <div>
                            <p className="text-[#1C160C] text-base font-medium leading-normal">React Training Topics</p>
                            <p className="text-[#A18249] text-sm font-normal leading-normal">Created by you</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3">
                        <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/73914778-b797-400b-b921-211401356803.png")'}}
                        ></div>
                        <div>
                            <p className="text-[#1C160C] text-base font-medium leading-normal">Resume for Interview</p>
                            <p className="text-[#A18249] text-sm font-normal leading-normal">Preview</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3">
                        <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/9e5d82f8-4696-4cb0-9f12-d97de09f8e64.png")'}}
                        ></div>
                        <div>
                            <p className="text-[#1C160C] text-base font-medium leading-normal">Loki Influencer Resume</p>
                            <p className="text-[#A18249] text-sm font-normal leading-normal">Preview</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3">
                        <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/56c974ee-b1f2-4d13-a6c9-16f49f931be6.png")'}}                        ></div>
                        <div>
                            <p className="text-[#1C160C] text-base font-medium leading-normal">Lead Tips &amp; Tricks</p>
                            <p className="text-[#A18249] text-sm font-normal leading-normal">Preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}