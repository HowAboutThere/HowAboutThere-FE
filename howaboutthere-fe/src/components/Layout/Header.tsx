import Logo from "@/assets/logo.svg";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="w-full py-3 px-4 flex justify-between items-center border-b bg-sky-50 border-sky-200">
      <div className="flex gap-2 items-center">
        <img className="m-0" src={Logo} alt="거기어때" />
        <h3 className="text-sky-600 ">거기어때</h3>
      </div>
      <Button variant="outline" className="shadow-none" onClick={() => {}}>
        로그인
      </Button>
    </header>
  );
}
