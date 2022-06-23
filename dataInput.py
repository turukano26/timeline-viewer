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

class Lotfi(Entry):
    def __init__(self, master, allowed_digits, **kwargs):
        self.allowed_digits = allowed_digits
        self.var = StringVar()
        Entry.__init__(self, master, textvariable=self.var, **kwargs)
        self.old_value = ''
        self.var.trace('w', self.check)
        self.get, self.set = self.var.get, self.var.set

    def check(self, *args):
        if self.get().isdigit() and len(self.get()) <= self.allowed_digits: 
            # the current value is only digits; allow this
            self.old_value = self.get()
        else:
            # there's non-digit characters in the input; reject this 
            self.set(self.old_value)

        

class AttributeField:
    def __init__(self, name, row_num, parent_frame):
        self.name = name
        self.row = row_num

        self.label = Label(parent_frame, text=name)
        self.label.grid(row=row_num, column=0)


class StringField(AttributeField):
    def __init__(self, name, row_num, parent_frame):
        self.entry = Entry(parent_frame)
        self.entry.grid(row=row_num, column=1)
        
        AttributeField.__init__(self, name, row_num, parent_frame)

    def get_data(self):
        return self.entry.get()


class DateField(AttributeField):
    def __init__(self, name, row_num, parent_frame):
        self.entry_year = Lotfi(parent_frame, 5)
        self.entry_year.grid(row=row_num, column=1)

        self.entry_month = Lotfi(parent_frame, 2)
        self.entry_month.grid(row=row_num, column=2)

        self.entry_day = Lotfi(parent_frame, 2)
        self.entry_day.grid(row=row_num, column=3)
        
        AttributeField.__init__(self, name, row_num, parent_frame)

    def get_data(self):
        rtn_str = self.entry_year.get()

        if self.entry_month.get() == '': return rtn_str
        rtn_str += '-' + self.entry_month.get()

        if self.entry_day.get() == '': return rtn_str
        return rtn_str + '-' + self.entry_day.get()
    





#defines person input window
def create_person_input():

    def submitForm():
        longStr = ''
        for entry in createdFields:
            longStr += entry.get_data() + "\n"
        output = Label(root, text=longStr)
        output.grid(row=4, column=0)

    attributes = [["Name", StringField],
                 ["Born", DateField],
                 ["Died", DateField]]

    createdFields = []

    for i, att in enumerate(attributes):
        createdFields.append(att[1](att[0], i, person_input))

    button1 = Button(person_input, text='Okay', command=submitForm)
    button1.grid(row=i+1)

    person_input.grid(row=1, column=0)


#defines person input window
def create_country_input():

    def submitForm():
        longStr = ''
        for entry in createdFields:
            longStr += entry.get_data() + "\n"
        output = Label(root, text=longStr)
        output.grid(row=4, column=0)

    attributes = [["Name", StringField],
                 ["Founded", DateField],
                 ["Fell", DateField]]

    createdFields = []

    for i, att in enumerate(attributes):
        createdFields.append(att[1](att[0], i, country_input))

    button1 = Button(country_input, text='Okay', command=submitForm)
    button1.grid(row=i+1)

    country_input.grid(row=1, column=0)


root.mainloop()