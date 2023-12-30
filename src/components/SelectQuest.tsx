"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getCategoryAPI } from "@/api/questApi";
import { Input } from "./ui/input";
import { useStore } from "@/store/store";

const FormSchema = z.object({
  category: z.string({
    required_error: "Please select an category name to display.",
  }),

  questNo: z.any({
    required_error: "Please fill the field",
  }),

  userName: z.string({
    required_error: "Please fill your field Username.",
  }),
});

export const SelectQuest = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    numberQuest,
    setNumberQuest,
    setCategoryName,
    setUserName,
    correctAnswerUser,
    incCorrectAnswer,
    resetCorrectAnswerUser,
  }: any = useStore();
  const { data: questCategory, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryAPI,
  });

  const initialValues = {
    questNo: numberQuest,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.questNo >= 20) {
      setNumberQuest(20);
    } else {
      setNumberQuest(data.questNo);
    }

    setCategoryName(data.category);
    setUserName(data.userName);
    resetCorrectAnswerUser();

    toast({
      title: "Thank You",
      description: `Hi, ${data.userName}.
      Enjoy the game
      `,
    });

    router.push("/quest");
  }

  if (isLoading) return <p>loading..</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <h1 className="text-3xl font-extrabold">Quiz App</h1>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Your Name</FormLabel>
              <Input type="text" placeholder="Your name..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Number of Questions</FormLabel>
              <Input
                type="number"
                placeholder="Number of Questions (max:20)"
                min={0}
                max={20}
                {...field}
                required
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Category Quest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category quest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {questCategory.map((category: any, index: any) => (
                    <SelectItem value={String(category.id)} key={index}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>You can select category quest</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {/* <p>{correctAnswerUser}</p>
      <Button onClick={incCorrectAnswer}>Correct Answer</Button> */}
    </Form>
  );
};
