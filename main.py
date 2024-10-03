import pyodbc
import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}








@app.get("/runandViewJobData")
async def runandViewJobData():
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + config.server +';DATABASE=Landing;Trusted_Connection=yes;')
    cursor = cnxn.cursor()
    cursor.execute('''Exec Landing..usp_RunJobsequence''')
    cnxn.commit()  # Ensure any updates are committed

    nodes_query = '''select jobid, jobname, status, isHold from Landing.dbo.jobsequence_test'''
    cursor.execute(nodes_query)
    nodes = [{"id": row.jobid, "jobname": row.jobname, "status": row.status, "isHold": row.isHold} for row in cursor.fetchall()]

    edges_query = "select parentid_1 as parentid, jobid from Landing..jobsequence_test where parentid_1 is not NULL UNION select parentid_2, jobid from Landing..jobsequence_test where parentid_2 is not NULL UNION select parentid_3, jobid from Landing..jobsequence_test where parentid_3 is not NULL"
    cursor.execute(edges_query)
    edges = [{"from": row.parentid, "to": row.jobid} for row in cursor.fetchall()]
    cnxn.close()
    graph_data = {"nodes": nodes, "edges": edges}
    return graph_data


@app.get("/serverName")
async def serverName():
    return {"servername": config.server}


@app.get("/getStartorStop")
async def getStartorStop():
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + config.server +';DATABASE=Landing;Trusted_Connection=yes;')
    cursor = cnxn.cursor()
    job_status_query = "Select value from Landing.dbo.jobsequence_state where conditionname = 'IsJobStartorStop'"
    cursor.execute(job_status_query)
    val_getStartorStop = [{"isjobStartorStop" : row.value} for row in cursor.fetchall()]
    cnxn.close()
    return val_getStartorStop
    #return {"Hello"}
    
@app.post("/toggleStartPauseStatus")
async def toggle_StartPauseStatus():
    try:
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + config.server +';DATABASE=Landing;Trusted_Connection=yes;')
        cursor = cnxn.cursor()
        cursor.execute("update Landing.dbo.jobsequence_state set value = ~value  where conditionname = 'IsJobStartorStop'")
        cnxn.commit()
        cnxn.close()
        return {"status": "ok"}
    except Exception as e:
        return {"error": str(e)} 

@app.post("/toggleHold")
async def toggle_hold(jobid: str):
    try:
        # Establish database connection
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + config.server +';DATABASE=Landing;Trusted_Connection=yes;')
        cursor = cnxn.cursor()
        print(jobid)
        print(type(jobid))
        # Toggle the hold status
        query = "UPDATE Landing..jobsequence_test SET isHold = ~isHold WHERE jobid = ?"
        cursor.execute(query, jobid)

        cnxn.commit()
        cnxn.close()

        return {"status": "ok"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/markasOk")
async def markasOk(jobid: str):
    try:
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + config.server +';DATABASE=Landing;Trusted_Connection=yes;')
        cursor = cnxn.cursor()
        query = "Update jobsequence_test set status = 1 where jobid = ?"
        cursor.execute(query, jobid)
        cnxn.commit()
        cnxn.close()
        return {"status": "ok"}
    except Exception as e:
        return {"error": str(e)}


@app.post("/changeStatus")
async def markasOk(jobid: str, status: str):
    try:
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + config.server +';DATABASE=Landing;Trusted_Connection=yes;')
        cursor = cnxn.cursor()
        query = "Update jobsequence_test set status = ? where jobid = ?"
        cursor.execute(query, (status,jobid))
        cnxn.commit()
        cnxn.close()
        return {"status": "ok"}
    except Exception as e:
        return {"error": str(e)}

