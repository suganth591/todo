<?php
$conn= new mysqli("sql12.freesqldatabase.com:3306","sql12629040","uNBy1wCvxc","sql12629040");
if(isset($_POST['add'])){
$task=$_POST['task'];
$dead=$_POST['dead'];
$stmt="insert into tasks(task,deadline) values('$task','$dead');";
$conn->query($stmt);
}
if(isset($_POST['delete'])){
$id=$_POST['id'];
$stmt="delete from tasks where id=$id";
echo($stmt);
$conn->query($stmt);
}
if(isset($_POST['complete'])){
    $id=$_POST['id'];
    $stmt="update tasks set completed=1 where id=$id";
    echo($stmt);
    $conn->query($stmt);
    }
if(isset($_POST['render'])){
    $stmt1="select * from tasks where completed=0";
    $res=$conn->query($stmt1);
    $row1=array();
    while($i=$res->fetch_assoc()){
        $row1[]=$i;
    }
    $stmt2="select * from tasks where completed=1";
    $res1=$conn->query($stmt2);
    $row2=array();
    while($i=$res1->fetch_assoc()){
        $row2[]=$i;
    }
    $ret=array(
        "0"=>$row1,
        "1"=>$row2
    );
    header('Content-Type: application/json');
    echo(json_encode($ret));
}
?>
