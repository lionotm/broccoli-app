'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { submitForm } from '@/app/actions'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

const formSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Name is required' }).trim(),
    email: z.string().email({ message: 'Enter a valid email address' }),
    confirmEmail: z.string().email({ message: 'Enter a valid confirmation email address' }),
  })
  .superRefine((data, ctx) => {
    if (data.email !== data.confirmEmail) {
      ctx.addIssue({
        path: ['confirmEmail'],
        message: 'Emails do not match',
        code: z.ZodIssueCode.custom,
      })
    }
  })

type SubmissionResult = { success: boolean; message: string } | null

export default function InvitationForm() {
  const [open, setOpen] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      confirmEmail: '',
    },
  })

  const { formState } = form
  const submitting = formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { fullName, email } = values
    const result = await submitForm({ name: fullName, email })
    setSubmissionResult(result)
    return result
  }

  const resetForm = () => {
    form.reset()
    setSubmissionResult(null)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    // Reset the form if the dialog is reopened after a successful submission
    if (isOpen && submissionResult?.success) resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Request Invite</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        {submissionResult?.success ? (
          <SuccessResult submissionResult={submissionResult} />
        ) : (
          <div>
            <DialogHeader className='mb-2'>
              <DialogTitle>Join the Broccoli Brigade!</DialogTitle>
              <DialogDescription>
                Sign up for a better life with Broccoli & Co. and join the brigade of healthy living
                enthusiasts!
              </DialogDescription>
            </DialogHeader>

            <ErrorResult submissionResult={submissionResult} />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your full name.' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='Enter your email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='Enter your email again' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className='sm:justify-end'>
                  <Button type='submit' disabled={submitting}>
                    {submitting && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
                    Submit
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function SuccessResult({ submissionResult }: { submissionResult: SubmissionResult }) {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Registered!</DialogTitle>
        <DialogDescription>{submissionResult?.message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant='secondary'>Close</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  )
}

function ErrorResult({ submissionResult }: { submissionResult: SubmissionResult }) {
  return (
    <>
      {submissionResult?.success === false && (
        <Alert variant='destructive' className='mb-2'>
          <ExclamationTriangleIcon className='h-4 w-4' />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{submissionResult.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
