# SQL_Agent_Job_Scheduler

This project cab be used to to arrange SQL Agent Job in Directed Acyclic Graph and represent it visually using Javascript (Dagre).

SQL agent Job Scheduler application using JavaScript in which jobs were represented in tree like visual diagram with advance features like ‘Hold’, ‘Release’, ‘Re-run’, ‘Mark as Ok’ & ‘Run-now’

How to Add this project to your local :

Open the file (Database Additions) and it will contain SQL Query to Create a Database, table, Stored Procedure. You can create them as per your flexibility.

You need to install Python and Uvicorn also.

Download all the files in your local at a particular path.

Open CMD at that path and type "uvicorn main:app --reload"

And now you can open "index'html' file and your porject will work.

You just need to insert rows in Table "jobsequence_test" to show to SQL Agent job visually in the html file.
