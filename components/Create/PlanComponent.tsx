'use client'

import { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2, Edit2 } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

const planSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  trainingDaysCount: z.string().min(1, "Number of training days is required"),
  trainingDays: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    type: z.string().min(1, "Type is required"),
    description: z.string().optional(),
    exercises: z.array(z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().optional(),
      category: z.string().min(1, "Category is required"),
      muscleGroup: z.string().min(1, "Muscle group is required"),
      sets: z.array(z.object({
        repetitions: z.number().min(1, "At least 1 repetition is required"),
        weight: z.number().optional(),
        duration: z.number().optional(),
        restTime: z.number().optional(),
      })).min(1, "At least one set is required"),
    })).min(1, "At least one exercise is required"),
  })).min(1, "At least one training day is required"),
})

type PlanFormValues = z.infer<typeof planSchema>

const emptyMockData: PlanFormValues = {
  title: "",
  description: "",
  trainingDaysCount: "1",
  trainingDays: [
    {
      title: "",
      type: "",
      description: "",
      exercises: [
        {
          title: "",
          description: "",
          category: "",
          muscleGroup: "",
          sets: [
            {
              repetitions: 1,
              weight: undefined,
              duration: undefined,
              restTime: undefined,
            },
          ],
        },
      ],
    },
  ],
}

export default function CreatePlanPage() {
  const [step, setStep] = useState(0)
  const { control, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: emptyMockData,
  })

  const { fields: trainingDayFields, append: appendTrainingDay, remove: removeTrainingDay } = useFieldArray({
    control,
    name: "trainingDays",
  })

  const onSubmit = (data: PlanFormValues) => {
    console.log('hola')
    console.log('Form Data:', JSON.stringify(data, null, 2))
  }

  const trainingDaysCount = watch('trainingDaysCount')

  useEffect(() => {
    const numDays = parseInt(trainingDaysCount)
    const currentDays = trainingDayFields.length
    if (numDays > currentDays) {
      for (let i = currentDays; i < numDays; i++) {
        appendTrainingDay(emptyMockData.trainingDays[0])
      }
    } else if (numDays < currentDays) {
      for (let i = currentDays - 1; i >= numDays; i--) {
        removeTrainingDay(i)
      }
    }
  }, [trainingDaysCount, appendTrainingDay, removeTrainingDay, trainingDayFields.length])

  const steps = [
    { title: "Plan Details", component: <PlanDetails control={control} errors={errors} /> },
    { title: "Training Days Overview", component: <TrainingDaysOverview trainingDayFields={trainingDayFields} control={control} /> },
    ...trainingDayFields.map((_, index) => ({
      title: `Training Day ${index + 1}`,
      component: <TrainingDay nestIndex={index} control={control} removeTrainingDay={removeTrainingDay} />
    })),
    { title: "Review", component: <ReviewPlan control={control} /> },
  ]

  const handleNextStep = async () => {
    if (step === 0) {
      const isValid = await trigger(['title', 'description', 'trainingDaysCount'])
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }
    }
    setStep(step + 1)
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Create Gym Training Plan</h1>
      <div className="mb-8">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${step >= index ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground text-muted-foreground'}`}>
                {index + 1}
              </div>
              <span className="mt-2 text-sm font-medium text-center">{s.title}</span>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {steps[step].component}
        <div className="flex justify-between mt-8">
          {step > 0 && (
            <Button type="button" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Create Plan</Button>
          )}
        </div>
      </form>
    </div>
  )
}

function PlanDetails({ control, errors }: { control: any; errors: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Plan Title</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} id="title" placeholder="My Awesome Gym Plan" className="w-full" />}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Plan Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Textarea {...field} id="description" placeholder="Describe your plan..." className="w-full" />}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingDaysCount">Number of Training Days</Label>
        <Controller
          name="trainingDaysCount"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of training days" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'day' : 'days'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.trainingDaysCount && <p className="text-sm text-destructive">{errors.trainingDaysCount.message}</p>}
      </div>
    </div>
  )
}

function TrainingDaysOverview({ trainingDayFields, control }: { trainingDayFields: any; control: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Training Days Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainingDayFields.map((field: any, index: number) => (
          <Card key={field.id}>
            <CardHeader>
              <CardTitle>Training Day {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name={`trainingDays.${index}.title`}
                control={control}
                render={({ field }) => <p><strong>Title:</strong> {field.value || 'Not set'}</p>}
              />
              <Controller
                name={`trainingDays.${index}.type`}
                control={control}
                render={({ field }) => <p><strong>Type:</strong> {field.value || 'Not set'}</p>}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TrainingDay({ nestIndex, control, removeTrainingDay }: { nestIndex: number; control: any; removeTrainingDay: (index: number) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Training Day {nestIndex + 1}</h2>
      <div className="space-y-4 p-4 bg-muted rounded-lg">
        <div className="space-y-2">
          <Label htmlFor={`trainingDays.${nestIndex}.title`}>Title</Label>
          <Controller
            name={`trainingDays.${nestIndex}.title`}
            control={control}
            render={({ field }) => <Input {...field} placeholder="Leg Day" className="w-full" />}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`trainingDays.${nestIndex}.type`}>Type</Label>
          <Controller
            name={`trainingDays.${nestIndex}.type`}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select training type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`trainingDays.${nestIndex}.description`}>Description</Label>
          <Controller
            name={`trainingDays.${nestIndex}.description`}
            control={control}
            render={({ field }) => <Textarea {...field} placeholder="Focus on compound movements..." className="w-full" />}
          />
        </div>

        <ExerciseFields nestIndex={nestIndex} control={control} />

        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            const trainingDaysCount = parseInt(control.getValues('trainingDaysCount'))
            if (trainingDaysCount > 1) {
              removeTrainingDay(nestIndex)
              control.setValue('trainingDaysCount', (trainingDaysCount - 1).toString())
            } else {
              toast({
                title: "Cannot Remove",
                description: "You must have at least one training day.",
                variant: "destructive",
              })
            }
          }} 
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Training Day
        </Button>
      </div>
    </div>
  )
}

function ExerciseFields({ nestIndex, control }: { nestIndex: number; control: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `trainingDays.${nestIndex}.exercises`
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Exercises</h3>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Exercise {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`trainingDays.${nestIndex}.exercises.${index}.title`}>Title</Label>
              <Controller
                name={`trainingDays.${nestIndex}.exercises.${index}.title`}
                control={control}
                render={({ field }) => <Input {...field} placeholder="Squats" className="w-full" />}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`trainingDays.${nestIndex}.exercises.${index}.category`}>Category</Label>
              <Controller
                name={`trainingDays.${nestIndex}.exercises.${index}.category`}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select exercise category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compound">Compound</SelectItem>
                      <SelectItem value="isolation">Isolation</SelectItem>
                      <SelectItem value="bodyweight">Bodyweight</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`trainingDays.${nestIndex}.exercises.${index}.muscleGroup`}>Muscle Group</Label>
              <Controller
                name={`trainingDays.${nestIndex}.exercises.${index}.muscleGroup`}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select muscle group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest">Chest</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="legs">Legs</SelectItem>
                      <SelectItem value="shoulders">Shoulders</SelectItem>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <SetFields nestIndex={nestIndex} exerciseIndex={index} control={control} />

            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                if (fields.length > 1) {
                  remove(index)
                } else {
                  toast({
                    title: "Cannot Remove",
                    description: "You must have at least one exercise per training day.",
                    variant: "destructive",
                  })
                }
              }} 
              className="w-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Exercise
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button type="button" onClick={() => append(emptyMockData.trainingDays[0].exercises[0])} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Exercise
      </Button>
    </div>
  )
}

function SetFields({ nestIndex, exerciseIndex, control }: { nestIndex: number; exerciseIndex: number; control: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets`
  });

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Sets</h4>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, index) => (
          <SetCard
            key={field.id}
            nestIndex={nestIndex}
            exerciseIndex={exerciseIndex}
            setIndex={index}
            control={control}
            onRemove={() => {
              if (fields.length > 1) {
                remove(index)
              } else {
                toast({
                  title: "Cannot Remove",
                  description: "You must have at least one set per exercise.",
                  variant: "destructive",
                })
              }
            }}
          />
        ))}
      </div>
      <Button type="button" onClick={() => append(emptyMockData.trainingDays[0].exercises[0].sets[0])} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Set
      </Button>
    </div>
  )
}

function SetCard({ nestIndex, exerciseIndex, setIndex, control, onRemove }: { nestIndex: number; exerciseIndex: number; setIndex: number; control: any; onRemove: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const { setValue } = useForm()

  const setData = useWatch({
    control,
    name: `trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}`,
    defaultValue: emptyMockData.trainingDays[0].exercises[0].sets[0],
  })

  const handleSave = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.${key}`, value)
    })
    setIsOpen(false)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h6 className="text-sm font-semibold">Set {setIndex + 1}</h6>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <SetForm
                nestIndex={nestIndex}
                exerciseIndex={exerciseIndex}
                setIndex={setIndex}
                control={control}
                onSave={handleSave}
                initialData={setData}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-1 text-sm">
          <p>Reps: {setData.repetitions || '-'}</p>
          <p>Weight: {setData.weight ? `${setData.weight}kg` : '-'}</p>
          <p>Duration: {setData.duration ? `${setData.duration}s` : '-'}</p>
          <p>Rest: {setData.restTime ? `${setData.restTime}s` : '-'}</p>
        </div>
        <Button type="button" variant="outline" onClick={onRemove} className="w-full mt-2">
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </CardContent>
    </Card>
  )
}

function SetForm({ nestIndex, exerciseIndex, setIndex, control, onSave, initialData }: { nestIndex: number; exerciseIndex: number; setIndex: number; control: any; onSave: (data: any) => void; initialData: any }) {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.repetitions`}>Repetitions</Label>
        <Input
          {...register(`repetitions`, { valueAsNumber: true })}
          type="number"
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.repetitions`}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`}>Weight (kg)</Label>
        <Input
          {...register(`weight`, { valueAsNumber: true })}
          type="number"
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.duration`}>Duration (seconds)</Label>
        <Input
          {...register(`duration`, { valueAsNumber: true })}
          type="number"
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.duration`}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.restTime`}>Rest Time (seconds)</Label>
        <Input
          {...register(`restTime`, { valueAsNumber: true })}
          type="number"
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.restTime`}
        />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  )
}

function ReviewPlan({ control }: { control: any }) {
  const { fields: trainingDays } = useFieldArray({ control, name: "trainingDays" });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Review Your Plan</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Plan Details</h3>
        <div className="bg-muted p-4 rounded-lg">
          <Controller
            name="title"
            control={control}
            render={({ field }) => <p><strong>Title:</strong> {field.value}</p>}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => <p><strong>Description:</strong> {field.value}</p>}
          />
          <Controller
            name="trainingDaysCount"
            control={control}
            render={({ field }) => <p><strong>Number of Training Days:</strong> {field.value}</p>}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Training Days</h3>
        {trainingDays.map((day, dayIndex) => (
          <div key={day.id} className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="text-lg font-semibold">Day {dayIndex + 1}</h4>
            <Controller
              name={`trainingDays.${dayIndex}.title`}
              control={control}
              render={({ field }) => <p><strong>Title:</strong> {field.value}</p>}
            />
            <Controller
              name={`trainingDays.${dayIndex}.type`}
              control={control}
              render={({ field }) => <p><strong>Type:</strong> {field.value}</p>}
            />
            <Controller
              name={`trainingDays.${dayIndex}.description`}
              control={control}
              render={({ field }) => <p><strong>Description:</strong> {field.value}</p>}
            />
            <h5 className="text-md font-semibold mt-2">Exercises:</h5>
            <Controller
              name={`trainingDays.${dayIndex}.exercises`}
              control={control}
              render={({ field }) => (
                <ul className="list-disc pl-5 space-y-2">
                  {field.value.map((exercise: any, exerciseIndex: number) => (
                    <li key={exerciseIndex}>
                      <strong>{exercise.title}</strong> - {exercise.category} ({exercise.muscleGroup})
                      <br />
                      Sets: {exercise.sets.length}
                      <ul className="list-circle pl-5 mt-1">
                        {exercise.sets.map((set: any, setIndex: number) => (
                          <li key={setIndex}>
                            Reps: {set.repetitions}, Weight: {set.weight}kg, Duration: {set.duration}s, Rest: {set.restTime}s
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}