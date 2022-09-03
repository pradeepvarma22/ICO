import Image from 'next/image'


export default function Body() {
    return (
        <div>

            <section className="container mx-auto px-6 p-10">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Work!</h2>
                <br />
                <br />
                <br />

                <div className="flex items-center flex-wrap mb-20">
                    <div className="w-full md:w-1/2">
                        <Image className="rounded-lg" width="100" height="80" layout="responsive" objectFit="contain" src="https://www.thesun.co.uk/wp-content/uploads/2019/06/SWJFO-EAPlay-08-1.jpg" alt="use the force" />
                    </div>
                    <div className="w-full md:w-1/2 pl-10">
                        <h4 className="text-3xl text-gray-800 font-bold mb-3">Metaverse!</h4>
                        <p className="text-gray-600 mb-8">
                            metaverse is a hypothetical iteration of the Internet as a single, universal and immersive virtual world that is facilitated by the use of virtual reality (VR) and augmented reality (AR) headsets. In colloquial use, a metaverse is a network of 3D virtual worlds focused on social connection
                        </p>
                    </div>
                </div>
                <div className="flex items-center flex-wrap mb-20">
                    <div className="w-full md:w-1/2 pr-10">
                        <h4 className="text-3xl text-gray-800 font-bold mb-3">DeFi</h4>
                        <p className="text-gray-600 mb-8">Decentralized finance (DeFi) refers to blockchain applications that cut out middlemen from financial products and services like loans, savings, and swaps.</p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image className="rounded-lg" width="100" height="80" layout="responsive" objectFit="contain" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Ferikkain%2Ffiles%2F2018%2F01%2FRey-Luke.jpg" alt="Syncing" />
                    </div>
                </div>
            </section>
        </div>
    )
}








