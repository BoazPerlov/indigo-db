from bokeh.models import ColumnDataSource, Plot, LinearAxis, Grid
from bokeh.models.glyphs import Line
from bokeh.plotting import figure, output_file, show
from bokeh.io import curdoc, show
import pandas
import numpy

output_file('main.html')

#read in CSV
df = pandas.read_csv('dbmaster.csv')
df.head()

ptable = pandas.pivot_table(df, index=['Brand', 'ProductCode'], values=['Turnover'], columns=['FinancialYear'], aggfunc=[numpy.sum], fill_value=0)
brandtable = ptable.query('Brand == ["Elan"]')

df2 = pandas.DataFrame(brandtable)
source = ColumnDataSource(df2)
x = 'FinancialYear'
y = 'ProductCode'
p=figure()

p.line(x,y, color='blue', source=source, legend='line')

#show(p)
df2.to_csv('test.csv')