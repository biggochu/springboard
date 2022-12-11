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

  it('should not add a new server if server name is empty', () => {
    serverNameInput.value = ''
    submitServerInfo()

    expect(Object.keys(allServers).length).toEqual(0)
  })

  it('should add the new server to html table on updateServerTable()', () => {
    submitServerInfo()
    updateServerTable()

    const $tr = serverTbody.querySelector('tr:last-child')
    expect($tr.children[0].innerText).toEqual('Alice')
    expect($tr.children[1].innerText).toEqual('$50.00')
  })

  afterEach(function() {
    serverNameInput.value = ''
    allServers = {}
    serverId = 0
    serverTbody.innerHTML = '';
  });
});