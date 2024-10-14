import { useForm } from "react-hook-form";

import Card from "@/components/Card/Card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SignInFormType = {
  id: string;
  password: string;
};

export default function SignInCard() {
  const form = useForm<SignInFormType>();

  const onSignIn = () => {
    console.log(form.getValues());
  };

  return (
    <Card title={"로그인"} description={"서비스 이용 시 로그인이 필요합니다."}>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name={"id"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    {...field}
                    className={`pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>패스워드</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="패스워드를 입력해주세요"
                    {...field}
                    className={`pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={onSignIn}>
            로그인
          </Button>
        </form>
      </Form>
    </Card>
  );
}
