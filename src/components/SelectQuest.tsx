"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

  questNo: z.any(),
});

export const SelectQuest = () => {
  const { toast } = useToast();
  const { numberQuest, categoryName, setNumberQuest, setCategoryName }: any =
    useStore();
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
    // toast({
    //   title: "You submitted the following values:",
    //   description: "hello",
    // });
    console.log("hello");
    console.log(numberQuest);
  }

  if (isLoading) return <p>loading..</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="questNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Number Questions</FormLabel>
              <Input
                type="number"
                placeholder="Number Questions"
                min={0}
                max={20}
                {...field}
                onChange={(e) => {
                  setNumberQuest(Number(e.target.value));
                }}
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
                <SelectContent
                // onChange={(e) => setCategoryName(e.target.value)}
                >
                  {questCategory.map((category: any, index: any) => (
                    <SelectItem value={category.name} key={index}>
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
    </Form>
  );
};
