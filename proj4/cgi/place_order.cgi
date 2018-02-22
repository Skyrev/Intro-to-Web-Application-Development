#!/usr/bin/perl  

# Revankar, Akash
# jadrn054
# Project #4
# Fall 2017

use CGI;
use CGI::Cookie;
use DBI;

$q = new CGI;
my $cookie = $q->cookie(-name=>'jadrn054',-value=>'',-path=>'/');
my %cookies = $ENV{COOKIE};
%cookies = CGI::Cookie->fetch;
my $v = $q->cookie('jadrn054');

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn054";
my $username = "jadrn054";
my $password = "strawberry";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

@rows = split('\|\|',$v);
foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
    my $sth = $dbh->prepare('INSERT INTO sales VALUES(CURDATE(), "'.$sku.'", "'.$qty.'");');
    $sth->execute();
    $sth->finish(); 
}
$dbh->disconnect();