describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function() {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function() {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should add the new server to html table on updateServerTable()', () => {
    updateServerTable()
  })

  afterEach(function() {
    serverNameInput.value = ''
    allServers = {}
    serverId = 0
    updateServerTable()
  });
});