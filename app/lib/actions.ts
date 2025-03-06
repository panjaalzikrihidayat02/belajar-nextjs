"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";

// Inisialisasi koneksi database
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

// Schema validasi menggunakan Zod
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

// Schema untuk Create Invoice
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Schema untuk Update Invoice
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Type untuk state error
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

/**
 * Fungsi untuk membuat invoice baru
 */
export async function createInvoice(prevState: State, formData: FormData) {
  // Validasi data form
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // Jika validasi gagal, kembalikan error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Ekstrak data yang sudah divalidasi
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    // Insert data ke database
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Revalidate path dan redirect
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Create Invoice." };
  }
}

/**
 * Fungsi untuk mengupdate invoice
 */
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  // Validasi data form
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: Number(formData.get("amount")),
    status: formData.get("status"),
  });

  // Jika validasi gagal, kembalikan error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  // Ekstrak data yang sudah divalidasi
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    // Update data di database
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

    // Revalidate path dan redirect
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Update Invoice." };
  }
}

/**
 * Fungsi untuk menghapus invoice
 */
export async function deleteInvoice(id: string) {
  try {
    // Hapus data dari database
    await sql`DELETE FROM invoices WHERE id = ${id}`;

    // Revalidate path
    revalidatePath("/dashboard/invoices");
    return { message: "Invoice deleted successfully." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

/**
 * Fungsi untuk autentikasi pengguna
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}