from msilib.schema import ComboBox
from tkinter import *
from tkinter.ttk import Combobox
from unittest import case


root = Tk()

#code for switching the input type

country_input = Frame(root)
person_input = Frame(root)

def switchInputType(event):

    if input_type_var.get() == 'Person':
        create_person_input()
        country_input.grid_remove()

    elif input_type_var.get() == 'Country':
        create_country_input()
        person_input.grid_remove()

    else:
        print("wtf")

input_type_var = StringVar()
input_type = Combobox(root, textvariable=input_type_var)
input_type.bind('<<ComboboxSelected>>', switchInputType)
input_type['values'] = ('Person', 'Country')
input_type.state(["readonly"])
input_type.grid(row=0, column=0)


#defines person input window
def create_person_input():

    def submitForm():
        output = Label(root, text=name.get() + birthDate.get())
        output.grid(row=4, column=0)

    titleLabel = Label(person_input, text="Insert Person")
    titleLabel.grid(row=0)

    name = Entry(person_input)
    name.grid(row=1)

    birthDate = Entry(person_input)
    birthDate.grid(row=2, column=0)

    deathDate = Entry(person_input)
    deathDate.grid(row=2, column=1)

    button1 = Button(person_input, text='Okay', command=submitForm)
    button1.grid(row=3)

    

    person_input.grid(row=1, column=0)


#defines person input window
def create_country_input():

    def submitForm():
        output = Label(root, text=name.get() + foundation_date.get())
        output.grid(row=4, column=1)

    titleLabel = Label(country_input, text="Insert Country")
    titleLabel.grid(row=0)

    name = Entry(country_input)
    name.grid(row=1)

    foundation_date = Entry(country_input)
    foundation_date.grid(row=2, column=0)

    destruction_date = Entry(country_input)
    destruction_date.grid(row=3, column=1)

    button1 = Button(country_input, text='Okay', command=submitForm)
    button1.grid(row=4)

    country_input.grid(row=1, column=0)


root.mainloop()