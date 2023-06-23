package br.com.projetomaestro.service.exception;

public class DatabaseException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DatabaseException(Object id) {
		super("Resource not found. Id " + id);
	}
}
