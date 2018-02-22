#!/usr/bin/perl

# Revankar, Akash
# jadrn054
# Project #4
# Fall 2017

use DBI;

print <<END_HTML;
Content-type: text/html

<!DOCTYPE html>
<html>
<!--
	Revankar, Akash
	jadrn054
	Project #4
	Fall 2017

	sales report
-->
	<head>
		<meta charset="UTF-8">
		
		<link rel="icon" type="image/png" href="/~jadrn054/proj4/favicon.png" />
		
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
		<link rel="stylesheet" href="/~jadrn054/proj4/css/style.css">
		
		<title>Sales Report | Bertha&apos;s Deluxe Chocolates</title>
	</head>

	<body>
		<div class="sales-report-container centered align-center">
      <table class="align-right">
        <tr>
          <th>Sl. No</th>
          <th>Date</th>
          <th>SKU</th>
          <th>Total Sales</th>
          <th>Cost Price</th>
          <th>Retail Price</th>
          <th>Total Cost</th>
          <th>Total Retail</th>
          <th>Total Profit</th>
        </tr>
        <tr>
          <td>Blank</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
END_HTML


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn054";
my $username = "jadrn054";
my $password = "strawberry";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $sth = $dbh->prepare('SELECT t1.Date, t1.SKU, SUM(t1.Quantity), t2.Cost, t2.Retail, ROUND(SUM(t1.Quantity)*t2.Cost, 2), ROUND(SUM(t1.Quantity)*t2.Retail, 2), ROUND((SUM(t1.Quantity)*t2.Retail - SUM(t1.Quantity)*t2.Cost), 2) FROM jadrn054.sales t1, proj4.products t2 WHERE t1.SKU = t2.SKU GROUP BY t1.SKU ORDER BY t1.SKU;');
$sth->execute();

my $net_sales = 0;
my $net_profit = 0;
my $count = 1;

while(my @row=$sth->fetchrow_array()) {
    print "<tr>";
    print "<td>".$count++."</td>";
    print "<td>".$row[0]."</td>";
    print "<td>".$row[1]."</td>";
    print "<td>".$row[2]."</td>";
    print "<td>&dollar;".$row[3]."</td>";
    print "<td>&dollar;".$row[4]."</td>";
    print "<td>&dollar;".$row[5]."</td>";
    print "<td>&dollar;".$row[6]."</td>";
    print "<td>&dollar;".$row[7]."</td>";
    print "</tr>";
    
    $net_sales += $row[2];
    $net_profit += $row[7];
}
$sth->finish();
$dbh->disconnect();

print "</table>";
print "<div class=\"aggregate-stats\"><h2>Bertha&apos;s Deluxe Chocolates<br>Sales Report FY 2017-2018</h2><br>";
print "<p>| Net Sales: ".$net_sales." | Net Profit: <span id=\"profit\">&dollar;".$net_profit."</span> |</p>";
print "</div>";
print "</div>";
print "</body>";
print "</html>";