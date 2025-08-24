import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

type DialogComponentProps = {
  textOpenDialog?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  [key: string]: any;
}

export default function DialogComponent({
  textOpenDialog = "Open Dialog",
  children,
  footer,
  trigger,
  ...props
}: DialogComponentProps) {

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button variant="outline">{textOpenDialog}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        { children }       
        {
          props.footer && 
          <DialogFooter>
            {props.footer}
          </DialogFooter>
        }
      </DialogContent>
    </Dialog>
  )
}
