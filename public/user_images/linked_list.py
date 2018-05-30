"""

	linked List

"""

class Node:
	def __init__(self, val, next_node=None):
		self.val = val
		self.next = next_node


def insert(head,val):
	if head is None:
		head = Node(val)
	else:
		head = crawler

		while crawler.next:
			crawler = crawler.next

		crawler = Node(val)
		return crawler


def display(head):
	while head:
		print(head.val)
		head = head.next

if __name__ == '__main__':
	head = None

	head = insert(head, 1)
	head = insert(head, 2)
	head = insert(head, 3)
	head = insert(head, 3)
	head = insert(head, 2)
	head = insert(head, 1)

	display(head)
