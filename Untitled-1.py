from collections import defaultdict

class Node:
    def __init__(self,value):
        self.value = value
        self.nieghbours = []
        self.parent=self
        
class Graph:
    def __init__(self):
        self.nodes = []
        self.edges = defaultdict(list)
    
    def getParent(self,node):
        if node.parent == node:
            return node
        node.parent=self.getParent(node.parent)
        return node.parent

    def union(self,node1,node2):
        node1Parent=self.getParent(node1)
        node2Parent=self.getParent(node2)
        node1Parent.parent=node2Parent
        
    def add_node(self,value):
        node = Node(value)
        self.nodes.append(node)
        return node 
    
    def add_edge(self,node1,node2):
        self.edges[node1].append(node2) 
        node1.nieghbours.append(node2)
        node2.nieghbours.append(node1)
    
    
    
    def print_edges(self):
        for edge in self.edges:
            print(f"{edge[0].value} -- {edge[1].value}")
    
    
if __name__=="__main__":
    
    
    g=Graph()
    nodeA=Node("A")
    nodeB=Node("B")
    nodeC=Node("C")
    g.add_edge(nodeA,nodeB)
    g.add_edge(nodeB,nodeC)
    print(g.print_edges())
    
    list=[(22,3),(4,5),(6,7)]
    for u,v in list:
        g.edges[u].append(v)
        # g.edges.setdefault(u,[]).append(v)
        
    
    g.print_edges()
    s=set()
    s.add("A")
    s.add("B")
    s.remove("A")
    print(s)
    