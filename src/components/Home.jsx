import { useSelector } from "react-redux";

function Home() {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const user = useSelector((state) => state.auth.user); 
    const username = user?.name;

    return (
        <div className={`flex flex-col  top-20 right-0 absolute  transition-all ${
            isOpen ? 'left-72 right-0' : 'left-0 right-0'
        }`}>
            <section className="pt-4">
        <div className="container mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our TODOBITS Website</h2>
            <p className="text-2xl mb-8">
                Stay Organized, Stay Productive
            </p>
            <p className="text-lg mb-8">
                Easily manage your tasks, prioritize your to-dos, and achieve your goals with our intuitive to-do list app.
            </p>
            {username ? (
                <div className="flex justify-center">
                    <p className="bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg px-6 py-3 rounded-lg hover:from-pink-500 hover:to-orange-500">Welcome {username}</p>
                </div>
            ) : (
                    <a href="/signup" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg px-6 py-3 rounded-lg hover:from-pink-500 hover:to-orange-500">
                    Get Started
                    </a>
            )

            }
            
        </div>
        </section>
        <section className="pt-16">
            <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="p-6 shadow w-80 bg-gray-600 rounded-lg">
                <h4 className="text-xl font-bold mb-2">Smart Task Management</h4>
                <ul className="list-disc pl-6">
                    <li className="mb-2">Create, edit, and delete tasks effortlessly.
                    </li>
                    <li className="mb-2">Organize tasks with categories and tags.
                    </li>
                    <li className="mb-2">Set deadlines and reminders to never miss a deadline.</li>
                </ul>
                </div>
                <div className="p-6 shadow w-80 bg-gray-600 rounded-lg">
                <h4 className="text-xl font-bold mb-2">Intuitive Design</h4>
                <ul className="list-disc pl-6">
                    <li className="mb-2">A clean and user-friendly interface.</li>
                    <li className="mb-2">Efficient navigation to easily access your tasks.</li>
                    <li className="mb-2">Save time and streamline your workflow.</li>
                </ul>
                </div>
                <div className="p-6 shadow w-80 bg-gray-600 rounded-lg">
                <h4 className="text-xl font-bold mb-2">Stay on Track</h4>
                <ul className="list-disc pl-6">
                    <li className="mb-2">Track your progress and stay on top of your to-do list.</li>
                    <li className="mb-2">Receive notifications for important tasks.</li>
                    <li className="mb-2">Set reminders to never miss a deadline.</li>
                </ul>
                </div>
            </div>
            </div>
        </section>

        </div>
    )
}

export default Home