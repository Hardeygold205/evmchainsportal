import Link from "next/link";
export default function Home() {
  const buttons = [
    {
      name: "Create New Wallet",
      link: "/create-wallet",
      color: "text-black",
      bgColor: "bg-white",
    },
    {
      name: "I already have wallet",
      link: "/import",
      color: "text-white",
      bgColor: "bg-gray-800",
    },
  ];

  return (
    <div className="justify-center items-center min-h-screen w-full flex flex-col space-y-5">
      <div>
        {buttons.map((button, index) => (
          <Link
            key={index}
            href={button.link}
            className={`btn btn-active ${button.color} ${button.bgColor} py-2 mb-3 rounded-full w-full text-center`}>
            {button.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
