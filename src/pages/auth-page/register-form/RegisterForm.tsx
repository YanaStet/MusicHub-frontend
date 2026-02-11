import { Button } from "@/shared/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-ui/card";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn-ui/field";
import { Input } from "@/shared/shadcn-ui/input";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authHooks } from "@/entities/auth/hooks";
import { showToast } from "@/shared/utils/showToast";
import { handleApiError } from "@/shared/utils/handleApiError";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/shared/shadcn-ui/spinner";
import { Typography } from "@/shared/shadcn-ui/typography";

type RegisterFormProps = {
  setDisplayRegister: () => void;
};

export const RegisterForm = ({ setDisplayRegister }: RegisterFormProps) => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = authHooks.useRegisterMutation();

  const handleSubmit = (values: RegisterSchema) => {
    mutate(
      {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      },
      {
        onSuccess: () => {
          showToast("success", "Registration was successful");
          navigate(ROUTE_PATHS.HOME);
        },
        onError: (er) => handleApiError(er),
      },
    );
  };

  return (
    <Card className="w-full sm:max-w-md bg-neutral-800 border-neutral-700 text-white">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="flex flex-col gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  onChange={field.onChange}
                  value={field.value}
                  type="email"
                  placeholder="example@gmail.com"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  type="password"
                  placeholder="Start typing"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  type="text"
                  placeholder="Start typing"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  type="text"
                  placeholder="Start typing"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Typography variant="body3">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={setDisplayRegister}
            >
              Login!
            </span>
          </Typography>
        </CardContent>
        <CardFooter className="flex flex-col gap-1 mt-4">
          <Button
            type="submit"
            className="w-full bg-neutral-900 cursor-pointer"
            disabled={isPending}
          >
            Register
            {isPending && <Spinner />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
