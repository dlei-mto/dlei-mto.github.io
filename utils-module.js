console.log('load utils-module.js');

console.log('[prettifyXml]', 'https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript');
function prettifyXml(sourceXml) {
  console.log('--- raw xml ---\n', sourceXml);
  const xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
  if (xmlDoc.getElementsByTagName('parsererror').length) {
    return '--- XML DOM Parser Error ---\n' + sourceXml;
  }
  const xsltDoc = new DOMParser().parseFromString([
      // // describes how we want to modify the XML - indent everything
      // '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      // '  <xsl:strip-space elements="*"/>',
      // '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
      // '    <xsl:value-of select="normalize-space(.)"/>',
      // '  </xsl:template>',
      // '  <xsl:template match="node()|@*">',
      // '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      // '  </xsl:template>',
      // '  <xsl:output indent="yes"/>',
      // '</xsl:stylesheet>',
      '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      '  <xsl:strip-space elements="*"/>',
      '  <xsl:output omit-xml-declaration="yes" indent="yes"/>',
      '  <xsl:template match="node()|@*">',
      '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      '  </xsl:template>',
      '</xsl:stylesheet>'
  ].join('\n'), 'application/xml');
  // xmlDoc.documentElement.outerHTML
  const xsltProcessor = new XSLTProcessor();    
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  const resultXml = new XMLSerializer().serializeToString(resultDoc);
  return resultXml;
};

export { prettifyXml };
