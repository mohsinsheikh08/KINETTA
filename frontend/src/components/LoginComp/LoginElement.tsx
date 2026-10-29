import Image from "next/image";
const LoginElement = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Image
          src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
          className="w-50"
          width={300}
          height={300}
          alt=""
        />
        <p className="text-xl font-heading font-black uppercase">
          Kinetta Login
        </p>
        <p className="text-center min-w-70 max-w-80 font-body text-gray-600 font-[500] text-sm">
          Welcome to KINETTA. Log in to access your personalized training gear
          and exclusive drops.
        </p>
      </div>
      <form className="">

      </form>
    </div>
  );
};

export default LoginElement;
