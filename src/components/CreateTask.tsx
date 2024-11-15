import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

const CreateTask = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-6 text-md">Añadir tarea +</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Agregar tarea</DialogTitle>
            <DialogDescription>
              Añade una nueva tarea y personaliza a tu gusto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Nombre de la tarea" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                defaultValue="Nombre de la tarea"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Descripción de la tarea" className="text-right">
                Descripción
              </Label>
              <Textarea
                placeholder="Descripción de la tarea"
                className="w-full col-span-3"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <Label htmlFor="Prioridad de la tarea" className="text-right ml-10">
                <Popover>
                  <PopoverTrigger>Prioridad</PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col gap-2">
                      <Button
                        className={buttonVariants({
                          variant: "secondary",
                          className: "hover:bg-zinc-200 flex items-center  w-40",
                        })}
                      >
                        <span>Prioridad alta</span>
                        <div className="rounded-full bg-red-600 w-[13px] h-[13px]" />
                      </Button>
                      <Button
                        className={buttonVariants({
                          variant: "secondary",
                          className: "hover:bg-zinc-200 flex items-center  w-40",
                        })}
                      >
                        <span>Prioridad media</span>
                        <div className="rounded-full bg-orange-500 w-[13px] h-[13px]" />
                      </Button>
                      <Button
                        className={buttonVariants({
                          variant: "secondary",
                          className: "hover:bg-zinc-200 flex items-center w-40",
                        })}
                      >
                        <span>Prioridad baja</span>
                        <div className="rounded-full bg-primary w-[13px] h-[13px]" />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </Label>
              <Label htmlFor="Fecha límite" className="text-right flex justify-end mr-10">
                Fecha límite
              </Label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTask;