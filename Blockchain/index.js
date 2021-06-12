"use strict";
var express = require("express");
var app = express();

const Blockchain = require("./blockchain");

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let node_id = uuidv4();
app.get("/", function (req, res) {
  res.send(JSON.stringify(Blockchain.chain));
});
app.get("/chain", function (req, res) {
  res.send(JSON.stringify(Blockchain.chain));
});

app.get("/mine", function (req, res) {
  var last_proof;
  let last_block = Blockchain.last_block();
  if (last_block == 0) {
    last_proof = 0;
  } else {
    last_proof = last_block.proof;
  }
  var proof = Blockchain.proof_of_work(last_proof);

  var index = Blockchain.new_transaction(0, node_id, 1);

  let previous_hash = Blockchain.hash(last_block);
  let block = Blockchain.new_block(proof, previous_hash);

  res.send(JSON.stringify(block));
});

app.post("/transactions/new", function (req, res) {
  if (
    req.query.sender === "" ||
    req.query.ammount === "" ||
    req.query.recipient === ""
  ) {
    res.send("Missing values");
    return;
  }
  let index = Blockchain.new_transaction(
    req.query.sender,
    req.query.recipient,
    req.query.ammount
  );
  res.send("Transaction will be added to block " + index);
});

app.post("/nodes/register", function (req, res) {
  var nodes = req.query.nodes;
  if (nodes === "") {
    res.send("Provide a list of nodes or leave me alone");
  }
  nodes.forEach((element) => {
    Blockchain.register_node(element);
  });
  res.send("Nodes will be added to the block ");
});

app.get("/nodes/resolve", function (req, res) {
  var replaced = Blockchain.resolve_conflicts();
  res.send(JSON.stringify(Blockchain));
});

var myArgs = process.argv.slice(2)[0];
console.log("Launching bitnode in port: ", myArgs);

var server = app.listen(myArgs, function () {});
