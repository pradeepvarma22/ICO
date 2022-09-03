import Head from 'next/head'

export default function Header() {
    return (
        <div>
            <Head>
                <title>ICO</title>
                <meta name="description" content="ICO" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <nav className="flex items-center justify-between flex-wrap p-6">
                    <div className="flex items-center flex-shrink-0 text-dark md:text-right mr-6">
                        <span className="font-semibold text-xl tracking-tight hover:text-green-800"><a href="#">ICO</a></span>
                    </div>

                    <div className="block lg:hidden">
                        <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>

                    <div id="nav-content" className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0 md:text-right">
                        <div className="text-sm lg:flex-grow">
                            <a href="" className="block mt-1 lg:inline-block lg:mt-0 text-dark-200 hover:text-teal-800 mr-4">Home</a>
                            <a href="" className="block mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-teal-800 mr-4">About</a>
                            <a href="" className="block mt-4 lg:inline-block lg:mt-0 text-dark-200 hover:text-teal-800 mr-4">Contact</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}