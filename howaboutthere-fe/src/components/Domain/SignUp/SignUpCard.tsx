import { useForm } from "react-hook-form";

import Card from "@/components/Card/Card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SignUpFormType = {
  id: string;
  password: string;
  validated_password: string;
  email: string;
  verified_email: number;
};

export default function SignUpCard() {
  const form = useForm<SignUpFormType>();

  const onSignUp = () => {
    console.log(form.getValues());
  };

  return (
    <Card title={"회원가입"} description={"간단한 가입으로 즉시 서비스 이용이 가능합니다."}>
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
                <Input
                  type="text"
                  placeholder="패스워드를 다시 입력해주세요"
                  {...field}
                  className={`pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      {...field}
                      className={`pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </FormControl>
                  <Button type="button">인증</Button>
                </div>
                <Input
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  {...field}
                  className={`pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={onSignUp}>
            회원가입
          </Button>
        </form>
      </Form>
    </Card>
  );
}
