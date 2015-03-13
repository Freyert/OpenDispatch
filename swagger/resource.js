/*
An abstract prototype parent for resources.
*/
function Resource() {

}

/*
  Used on response objects.
  sendDocs.call(res).
  sendDocs.bind(res).
*/
Resource.prototype.sendDocs = function (err, docs) {
  if (docs) {
    this.send(JSON.stringify(docs));
  }
  else {
    this.status(404).send(err);
  }
};

module.exports = Resource;
